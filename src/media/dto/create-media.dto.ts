import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne doit pas etre vide' })
  nom: string;

  @IsString()
  @IsNotEmpty({ message: 'Le path ne doit pas etre vide' })
  path: string;

  @IsString()
  @IsNotEmpty({ message: "L'url de l'image ne doit pas etre vide" })
  imageUrl: string;
}
