import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('design')
@Controller('design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createDesignDto: CreateDesignDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.designService.create(createDesignDto, files);
  }

  @Get()
  findAll() {
    return this.designService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.designService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDesignDto: UpdateDesignDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.designService.update(+id, updateDesignDto, files);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.designService.remove(+id);
  }
}
