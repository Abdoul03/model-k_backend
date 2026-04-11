import { ApiProperty } from '@nestjs/swagger';
import { TypeCostumisation } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustumOptionDto {
  @ApiProperty()
  @IsEnum(['Col', 'Bouton', 'Broderie', 'Manche'], {
    message:
      'Le type de customisation doit être soit "Col" soit "Bouton" soit "Broderie" soit "Manche".',
  })
  @IsNotEmpty({ message: 'Le type de customisaton ne doit pas etre vide' })
  type: TypeCostumisation;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Vous devez ajoute un nom a votre customisation' })
  nom: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le prix ajouter est obligatoire' })
  prixAjout: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vous devez choisir un model pour la customisation' })
  modelId: number;
}
