import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
  nom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le prenom ne doit pas être vide' })
  prenom: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: "L'email ne doit pas être vide." })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Le numero doit etre au minimun 8 caractere' })
  @MaxLength(15, { message: 'Le numero doit etre au maximun 15' })
  @IsNotEmpty({ message: 'Le téléphone ne doit pas être vide.' })
  telephone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide.' })
  @MinLength(6, {
    message: 'Le mot de passe doit comporter au moins 6 caractères.',
  })
  @MaxLength(20, {
    message: 'Le mot de passe doit comporter au maximum 20 caractères.',
  })
  motDePasse: string;

  @ApiProperty()
  @IsString({ message: "L'adresse doit être une chaîne de caractères." })
  @IsOptional()
  adresse?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['CLIENT', 'ADMIN'], {
    message: 'Le rôle doit être soit "Client" soit "ADMIN".',
  })
  role?: 'CLIENT' | 'ADMIN';
}
