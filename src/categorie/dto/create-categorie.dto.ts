import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategorieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
  nom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La description ne doit pas être vide' })
  description: string;
}
