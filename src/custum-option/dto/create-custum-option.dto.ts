import { TypeCostumisation } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustumOptionDto {
  @IsEnum(['Col', 'Bouton', 'Broderie', 'Manche'], {
    message:
      'Le type de customisation doit être soit "Col" soit "Bouton" soit "Broderie" soit "Manche".',
  })
  @IsNotEmpty({ message: 'Le type de customisaton ne doit pas etre vide' })
  type: TypeCostumisation;

  @IsString()
  @IsNotEmpty({ message: 'Vous devez ajoute un nom a votre customisation' })
  nom: string;

  @IsNotEmpty({ message: 'Le prix ajouter est obligatoire' })
  prixAjout: number;

  @IsNotEmpty({ message: 'Vous devez choisir un model pour la customisation' })
  modelId: number;
}
