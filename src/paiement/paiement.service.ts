import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PaiementService {
  constructor(private readonly databaseService: DatabaseService) {}
  async effectuerPaiement(createPaiementDto: CreatePaiementDto) {
    return await this.databaseService.$transaction(async (tx) => {
      const commande = await tx.commande.findUnique({
        where: { id: createPaiementDto.commandeId },
      });

      if (!commande) throw new NotFoundException('Commande introuvable');

      const paiement = await tx.paiement.create({
        data: {
          ...createPaiementDto,
          statutPaiement: 'Effectue',
        },
      });
      await tx.commande.update({
        where: { id: commande.id },
        data: { statutCommande: 'EnProduction' },
      });
      return paiement;
    });
  }

  findAll() {
    return `This action returns all paiement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paiement`;
  }

  // update(id: number, updatePaiementDto: UpdatePaiementDto) {
  //   return `This action updates a #${id} paiement`;
  // }

  remove(id: number) {
    return `This action removes a #${id} paiement`;
  }
}
