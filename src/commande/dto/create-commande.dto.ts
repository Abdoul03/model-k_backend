import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommandeDto {
  @ApiProperty()
  @IsNotEmpty({ message: "L'id de l'utilisateur est obligatoire" })
  utilisateurId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La mesure est obligatoire' })
  mesureId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le model est oblicatoire' })
  tenues: {
    modelId: number;
    tissusId: number;
    mesureId: number;
    quantite: number;
    optionIds: number[];
  }[];
}
