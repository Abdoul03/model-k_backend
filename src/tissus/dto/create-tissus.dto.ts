import { ApiProperty } from '@nestjs/swagger';
import { TypeTissus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTissusDto {
  @IsEnum(['Bazin', 'Coton', 'Lin'], {
    message: 'Le rôle doit être soit "Client" soit "ADMIN".',
  })
  type: TypeTissus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La couleur ne doit pas être vide' })
  couleur: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La texture ne doit pas être vide' })
  texture: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le prix par metre ne doit pas être vide' })
  prixParMetre: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nombre de stock ne doit pas être vide' })
  stock: number;
}
