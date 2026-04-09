import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  Delete,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { TissusService } from './tissus.service';
import { CreateTissusDto } from './dto/create-tissus.dto';
import { UpdateTissusDto } from './dto/update-tissus.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('tissus')
export class TissusController {
  constructor(private readonly tissusService: TissusService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createTissusDto: CreateTissusDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.tissusService.create(createTissusDto, files);
  }

  @Get()
  findAll() {
    return this.tissusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tissusService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTissusDto: UpdateTissusDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.tissusService.update(id, updateTissusDto, files);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tissusService.remove(id);
  }
}
