import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TissusService } from './tissus.service';
import { CreateTissusDto } from './dto/create-tissus.dto';
import { UpdateTissusDto } from './dto/update-tissus.dto';

@Controller('tissus')
export class TissusController {
  constructor(private readonly tissusService: TissusService) {}

  @Post()
  create(@Body() createTissusDto: CreateTissusDto) {
    return this.tissusService.create(createTissusDto);
  }

  @Get()
  findAll() {
    return this.tissusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tissusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTissusDto: UpdateTissusDto) {
    return this.tissusService.update(+id, updateTissusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tissusService.remove(+id);
  }
}
