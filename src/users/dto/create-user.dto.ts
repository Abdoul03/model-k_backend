import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsEmpty({ message: 'Le nom ne doit pas être vide.' })
  nom: string;

  @ApiProperty()
  @IsString({ message: 'Le prénom doit être une chaîne de caractères.' })
  @IsEmpty({ message: 'Le prénom ne doit pas être vide.' })
  prenom: string;

  @ApiProperty()
  @IsString({ message: "L'email doit être une chaîne de caractères." })
  @IsEmail({}, { message: "L'email doit être une adresse email valide." })
  @IsNotEmpty({ message: "L'email ne doit pas être vide." })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le téléphone ne doit pas être vide.' })
  telephone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide.' })
  @MinLength(6, {
    message: 'Le mot de passe doit comporter au moins 6 caractères.',
  })
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
  @IsEnum(['CLIENT', 'ADMIN'], {
    message: 'Le rôle doit être soit "Client" soit "ADMIN".',
  })
  role?: 'CLIENT' | 'ADMIN';
}
