import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDesignDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
  nom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La description ne doit pas être vide' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le prix de base est obligatoire' })
  prixBase: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le prix de base est obligatoire' })
  nombreDeMetre: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La categorie est obligatoire' })
  categorieId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le tissus est obligatoire' })
  tissusId: number;
}
