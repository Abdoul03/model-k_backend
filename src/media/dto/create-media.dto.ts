import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne doit pas etre vide' })
  nom: string;
}
