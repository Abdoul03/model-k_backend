import { PartialType } from '@nestjs/swagger';
import { CreateTissusDto } from './create-tissus.dto';

export class UpdateTissusDto extends PartialType(CreateTissusDto) {}
