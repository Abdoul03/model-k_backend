import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';

@Controller('mesure')
export class MesureController {
  constructor(private readonly mesureService: MesureService) {}

  @Post()
  create(@Body() createMesureDto: CreateMesureDto) {
    return this.mesureService.create(createMesureDto);
  }

  @Get()
  findAll() {
    return this.mesureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesureDto: UpdateMesureDto) {
    return this.mesureService.update(+id, updateMesureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesureService.remove(+id);
  }
}
