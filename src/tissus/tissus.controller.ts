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
} from '@nestjs/common';
import { TissusService } from './tissus.service';
import { CreateTissusDto } from './dto/create-tissus.dto';
import { UpdateTissusDto } from './dto/update-tissus.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('design')
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
