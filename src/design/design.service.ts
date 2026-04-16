import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { CategorieService } from '../categorie/categorie.service';
import { MediaService } from '../media/media.service';
import { DatabaseService } from '../database/database.service';
import { Media } from '../media/entities/media.entity';

@Injectable()
export class DesignService {
  constructor(
    private readonly categorieService: CategorieService,
    private readonly mediaService: MediaService,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(createDesignDto: CreateDesignDto, files: Express.Multer.File[]) {
    const categorie = await this.categorieService.findOne(
      Number(createDesignDto.categorieId),
    );
    if (!categorie) {
      throw new NotFoundException('Categorie introuvable');
    }

    return await this.databaseService.$transaction(async (prisma) => {
      const model = await prisma.model.create({
        data: {
          nom: createDesignDto.nom,
          description: createDesignDto.description,
          prixBase: Number(createDesignDto.prixBase),
          nombreDeMetre: Number(createDesignDto.nombreDeMetre),
          categorieId: Number(categorie.id),
          tissusId: Number(createDesignDto.tissusId),
        },
        include: {
          options: true,
        },
      });

      const createdMedias: Media[] = [];

      for (const file of files) {
        const media = await this.mediaService.create(model.nom, file);

        const linkedMedia = await prisma.media.update({
          where: { id: media.id },
          data: { modelId: model.id },
        });
        createdMedias.push(linkedMedia);
      }

      return {
        model,
        medias: createdMedias,
      };
    });
  }

  async findAll() {
    const models = await this.databaseService.model.findMany({
      include: {
        medias: true,
        categorie: true,
        options: true,
      },
    });
    return models;
  }

  async findOne(id: number) {
    const model = await this.databaseService.model.findUnique({
      where: { id },
      include: {
        medias: true,
        categorie: true,
        options: true,
      },
    });

    return model;
  }

  async update(
    id: number,
    updateDesignDto: UpdateDesignDto,
    files?: Express.Multer.File[],
  ) {
    const design = await this.databaseService.model.findUnique({
      where: { id },
      include: { medias: true },
    });

    if (!design) {
      throw new NotFoundException('Design introuvable');
    }

    return await this.databaseService.$transaction(async (prisma) => {
      const updatedModel = await prisma.model.update({
        where: { id },
        data: {
          nom: updateDesignDto.nom ?? design.nom,
          description: updateDesignDto.description ?? design.description,
          prixBase: Number(updateDesignDto.prixBase ?? design.prixBase),
          nombreDeMetre: Number(
            updateDesignDto.nombreDeMetre ?? design.nombreDeMetre,
          ),
          categorieId: Number(
            updateDesignDto.categorieId ?? design.categorieId,
          ),
        },
      });

      // 3. Ajouter de nouveaux médias si fournis
      if (files && files.length > 0) {
        // Stratégie : On remplace le premier média existant par le nouveau,
        // ou on en crée de nouveaux si nécessaire.
        for (let i = 0; i < files.length; i++) {
          if (design.medias[i]) {
            // Utilise ta méthode MediaService.update (ID, Nom, Fichier)
            await this.mediaService.update(
              design.medias[i].id,
              updatedModel.nom,
              files[i],
            );
          } else {
            // Si plus de fichiers que de médias existants, on crée
            const newMedia = await this.mediaService.create(
              updatedModel.nom,
              files[i],
            );
            await prisma.media.update({
              where: { id: newMedia.id },
              data: { modelId: updatedModel.id },
            });
          }
        }
      }
      return updatedModel;
    });
  }

  async remove(id: number) {
    const design = await this.databaseService.model.findUnique({
      where: { id },
      include: { medias: true },
    });

    if (!design) throw new NotFoundException('Design introuvable');

    for (const media of design.medias) {
      await this.mediaService.remove(media.id);
    }
    await this.databaseService.model.delete({
      where: { id },
    });
    return {
      message: `Le design ${design.nom} et tous ses médias ont été supprimés.`,
    };
  }
}
