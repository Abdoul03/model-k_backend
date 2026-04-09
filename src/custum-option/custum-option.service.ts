import { Injectable } from '@nestjs/common';
import { CreateCustumOptionDto } from './dto/create-custum-option.dto';
import { UpdateCustumOptionDto } from './dto/update-custum-option.dto';

@Injectable()
export class CustumOptionService {
  create(createCustumOptionDto: CreateCustumOptionDto) {
    return 'This action adds a new custumOption';
  }

  findAll() {
    return `This action returns all custumOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} custumOption`;
  }

  update(id: number, updateCustumOptionDto: UpdateCustumOptionDto) {
    return `This action updates a #${id} custumOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} custumOption`;
  }
}
