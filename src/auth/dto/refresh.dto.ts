import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Le refreshToken ne doit pas être vide' })
  refreshToken: string;
}
