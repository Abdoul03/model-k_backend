import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ModePaiement } from '../entities/paiement.entity';

export class CreatePaiementDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  commandeId: number;

  @IsEnum(ModePaiement)
  modePaiement: ModePaiement;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  montant: number;
}
