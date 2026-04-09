import { PartialType } from '@nestjs/swagger';
import { CreateCustumOptionDto } from './create-custum-option.dto';

export class UpdateCustumOptionDto extends PartialType(CreateCustumOptionDto) {}
