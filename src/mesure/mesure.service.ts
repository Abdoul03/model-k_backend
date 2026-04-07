import { Injectable } from '@nestjs/common';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';

@Injectable()
export class MesureService {
  create(createMesureDto: CreateMesureDto) {
    return 'This action adds a new mesure';
  }

  findAll() {
    return `This action returns all mesure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mesure`;
  }

  update(id: number, updateMesureDto: UpdateMesureDto) {
    return `This action updates a #${id} mesure`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesure`;
  }
}
