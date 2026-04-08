import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMesureDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
  label: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'La valeur de la proitrine ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur de la poitrine doit être positif' })
  poitrine: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'La valeur de la taille ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur de la taille doit être positif' })
  taille: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Le poids ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur du poids doit être positif' })
  poids: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: "L'epaule ne doit pas de etre vide" })
  @IsPositive({ message: "La valeur de l'epaule doit être positif" })
  epaule: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({
    message: 'La valeur de la longueur du bras ne doit pas de etre vide',
  })
  @IsPositive({ message: 'La valeur de la longeur du bras doit être positif' })
  longueurBras: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({
    message: 'La valeur de la longueur de la jambe ne doit pas de etre vide',
  })
  @IsPositive({
    message: 'La valeur de la longeur de la jambe doit être positif',
  })
  longueurJambe: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'La valeur du cou ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur du cou doit être positif' })
  cou: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'La valeur du hanche ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur de la hanche doit être positif' })
  hanche: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'La valeur du poignet ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur du poignet doit être positif' })
  poignet: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'La valeur du ventre ne doit pas de etre vide' })
  @IsPositive({ message: 'La valeur du ventre doit être positif' })
  ventre: number;
}
