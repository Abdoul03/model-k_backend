import { Injectable } from '@nestjs/common';
import { CreateTissusDto } from './dto/create-tissus.dto';
import { UpdateTissusDto } from './dto/update-tissus.dto';

@Injectable()
export class TissusService {
  create(createTissusDto: CreateTissusDto) {
    return 'This action adds a new tissus';
  }

  findAll() {
    return `This action returns all tissus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tissus`;
  }

  update(id: number, updateTissusDto: UpdateTissusDto) {
    return `This action updates a #${id} tissus`;
  }

  remove(id: number) {
    return `This action removes a #${id} tissus`;
  }
}
