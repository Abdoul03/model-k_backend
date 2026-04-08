import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { DatabaseService } from '../database/database.service';
import { Categorie } from './entities/categorie.entity';

@Injectable()
export class CategorieService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return await this.databaseService.$transaction(async (prisma) => {
      return await prisma.categorie.create({
        data: createCategorieDto,
      });
    });
  }

  async findAll(): Promise<Categorie[]> {
    return await this.databaseService.categorie.findMany();
  }

  async findOne(id: number): Promise<Categorie> {
    const categorie = await this.databaseService.categorie.findUnique({
      where: { id },
    });
    if (!categorie) {
      throw new NotFoundException('Categorie introuvable');
    }
    return categorie;
  }

  async update(id: number, updateCategorieDto: UpdateCategorieDto) {
    const categorie = await this.databaseService.categorie.findUnique({
      where: { id },
    });
    if (!categorie) {
      throw new NotFoundException('Categorie introuvable');
    }
    return await this.databaseService.categorie.update({
      where: { id },
      data: { ...updateCategorieDto },
    });
  }

  async remove(id: number) {
    return await this.databaseService.categorie.delete({
      where: { id },
    });
  }
}
