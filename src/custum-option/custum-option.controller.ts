import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustumOptionService } from './custum-option.service';
import { CreateCustumOptionDto } from './dto/create-custum-option.dto';
import { UpdateCustumOptionDto } from './dto/update-custum-option.dto';

@Controller('custum-option')
export class CustumOptionController {
  constructor(private readonly custumOptionService: CustumOptionService) {}

  @Post()
  create(@Body() createCustumOptionDto: CreateCustumOptionDto) {
    return this.custumOptionService.create(createCustumOptionDto);
  }

  @Get(':modelId')
  findAll(@Param('modelId') modelId: number) {
    return this.custumOptionService.findAll(modelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.custumOptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustumOptionDto: UpdateCustumOptionDto,
  ) {
    return this.custumOptionService.update(+id, updateCustumOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.custumOptionService.remove(+id);
  }
}
