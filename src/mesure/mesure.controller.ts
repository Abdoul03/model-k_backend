import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MesureService } from './mesure.service';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';

@Controller('mesure')
export class MesureController {
  constructor(private readonly mesureService: MesureService) {}

  @Post(':userId')
  create(
    @Body() createMesureDto: CreateMesureDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.mesureService.createUserMesure(createMesureDto, userId);
  }

  @Get(':userId/all')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.mesureService.findAllMesuresOfUser(userId);
  }

  @Get(':id/:userId')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId') userId: number,
  ) {
    return this.mesureService.findOneMesure(id, userId);
  }

  @Patch(':id/:userId')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateMesureDto: UpdateMesureDto,
  ) {
    return this.mesureService.update(id, updateMesureDto, userId);
  }

  @Delete(':id/:userId')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.mesureService.remove(id, userId);
  }
}
