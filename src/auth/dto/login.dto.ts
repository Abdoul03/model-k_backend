import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Le mot de passe doit comporter au moins 6 caractères.',
  })
  @ApiProperty()
  password: string;
}
