import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';
import { MesureService } from '../mesure/mesure.service';

@Injectable()
export class CommandeService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UsersService,
    private readonly mesureService: MesureService,
  ) {}

  async create(createCommandeDto: CreateCommandeDto) {
    const { utilisateurId, mesureId, tenues } = createCommandeDto;

    const utilisateur = await this.userService.findOne(utilisateurId);

    if (!utilisateur) {
      throw new NotFoundException('Utilisateur introvable');
    }

    const mesuresUtilisateur = await this.mesureService.findOneMesure(
      mesureId,
      utilisateurId,
    );

    if (!mesuresUtilisateur) {
      throw new Error('Mesures introuvables. Veuillez configurer vos mesures.');
    }

    return await this.databaseService.$transaction(async (tx) => {
      // Création de la commande de base
      const commande = await tx.commande.create({
        data: {
          utilisateurId,
          statutCommande: 'EnAttente',
          totalPrice: 0, // Sera mis à jour après le calcul
        },
      });

      let totalCommande = 0;

      for (const item of tenues) {
        const model = await tx.model.findUnique({
          where: { id: item.modelId },
        });
        const tissu = await tx.tissus.findUnique({
          where: { id: item.tissusId },
        });

        if (!model || !tissu) {
          throw new NotFoundException(
            `Modèle ou Tissu introuvable pour l'item`,
          );
        }

        const options = await tx.optionCustomisation.findMany({
          where: { id: { in: item.optionIds } },
        });

        // Calcul du prix : Base + (Métrage * Prix/m) + Options
        const prixOptions = options.reduce(
          (sum, opt) => sum + opt.prixAjout,
          0,
        );
        const prixTissu = model.nombreDeMetre * tissu.prixParMetre;
        const prixUnitaire = model.prixBase + prixTissu + prixOptions;

        totalCommande += prixUnitaire * item.quantite;

        // 4. Créer la Tenue avec son Snapshot de mesures
        await tx.tenue.create({
          data: {
            commandeId: commande.id,
            modelId: item.modelId,
            tissusId: item.tissusId,
            mesureId: item.mesureId,
            quantite: item.quantite,
            prixUnitaire: prixUnitaire,
            mesuresSnapshot: {
              label: mesuresUtilisateur.label,
              poitrine: mesuresUtilisateur.poitrine,
              taille: mesuresUtilisateur.taille,
              poids: mesuresUtilisateur.poids,
              epaule: mesuresUtilisateur.epaule,
              longueurBras: mesuresUtilisateur.longueurBras,
              longueurJambe: mesuresUtilisateur.longueurJambe,
              cou: mesuresUtilisateur.cou,
              hanche: mesuresUtilisateur.hanche,
              poignet: mesuresUtilisateur.poignet,
              ventre: mesuresUtilisateur.ventre,
            },
            // Enregistrer les options choisies
            options: {
              create: item.optionIds.map((id) => ({
                optionCustomisationId: id,
              })),
            },
          },
        });
      }
      return tx.commande.update({
        where: { id: commande.id },
        data: { totalPrice: totalCommande },
        include: { tenues: { include: { options: true } } },
      });
    });
  }

  async findAllUserCommand(userId: number) {
    const utilisateur = await this.userService.findOne(userId);

    if (!utilisateur) {
      throw new NotFoundException('Utilisateur introvable');
    }

    const commandes = await this.databaseService.commande.findMany({
      where: {
        utilisateurId: utilisateur.id,
      },
      include: { tenues: { include: { options: true } } },
    });

    return commandes;
  }

  async findAll() {
    return await this.databaseService.commande.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.commande.findUnique({ where: { id } });
  }

  async update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return await this.databaseService.$transaction(async (tx) => {
      // 1. Vérifier si la commande existe et son statut
      const commandeExistante = await tx.commande.findUnique({
        where: { id },
        include: { tenues: true },
      });

      if (!commandeExistante) {
        throw new NotFoundException('Commande existante introuvable');
      }

      if (commandeExistante.statutCommande !== 'EnAttente') {
        throw new BadRequestException(
          'La commande est déjà en production et ne peut plus être modifiée.',
        );
      }

      // 2. Si on modifie les tenues (ex: changement d'options ou de tissu)
      if (updateCommandeDto.tenues) {
        for (const item of updateCommandeDto.tenues) {
          // On récupère les nouveaux prix des options/tissus
          const model = await tx.model.findUnique({
            where: { id: item.modelId },
          });
          const tissu = await tx.tissus.findUnique({
            where: { id: item.tissusId },
          });
          const options = await tx.optionCustomisation.findMany({
            where: { id: { in: item.optionIds } },
          });

          if (!model || !tissu) {
            throw new NotFoundException(
              `Modèle ou Tissu introuvable pour l'item`,
            );
          }

          const prixUnitaire =
            model.prixBase +
            model.nombreDeMetre * tissu.prixParMetre +
            options.reduce((s, o) => s + o.prixAjout, 0);

          // Mise à jour de la tenue et de ses options
          await tx.tenue.update({
            where: { id: item.tenueId },
            data: {
              tissusId: item.tissusId,
              quantite: item.quantite,
              prixUnitaire: prixUnitaire,
              // On remplace les anciennes options par les nouvelles
              options: {
                deleteMany: {}, // Supprime les anciens choix
                create: item.optionIds.map((oid) => ({
                  optionCustomisationId: oid,
                })),
              },
            },
          });
        }
      }

      // 3. Recalculer le totalPrice de la commande globale
      const tenuesMisesAJour = await tx.tenue.findMany({
        where: { commandeId: id },
      });
      const nouveauTotal = tenuesMisesAJour.reduce(
        (s, t) => s + t.prixUnitaire * t.quantite,
        0,
      );

      return tx.commande.update({
        where: { id },
        data: {
          totalPrice: nouveauTotal,
          statutCommande: commandeExistante.statutCommande, // Permet aussi à l'admin de changer le statut
        },
      });
    });
  }

  async remove(id: number) {
    return await this.databaseService.commande.delete({ where: { id } });
  }
}
