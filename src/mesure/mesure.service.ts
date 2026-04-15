import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { UpdateMesureDto } from './dto/update-mesure.dto';
import { UsersService } from '../users/users.service';
import { Mesure } from './entities/mesure.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MesureService {
  constructor(
    private readonly usersService: UsersService,
    private readonly databaseService: DatabaseService,
  ) {}

  async createUserMesure(
    createMesureDto: CreateMesureDto,
    userId: number,
  ): Promise<Mesure> {
    return await this.databaseService.$transaction(async (prisma) => {
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new NotFoundException('Utilisateur introuvable');
      }
      const mesure = await prisma.mesure.create({
        data: {
          ...createMesureDto,
          utilisateurId: user.id,
        },
      });
      return mesure;
    });
  }

  async findAllMesuresOfUser(userId: number): Promise<Mesure[]> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return await this.databaseService.mesure.findMany({
      where: {
        utilisateurId: user.id,
      },
    });
  }

  async findOneMesure(id: number, userId: number): Promise<Mesure> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    const mesure = await this.databaseService.mesure.findUnique({
      where: { id },
    });
    if (!mesure) {
      throw new NotFoundException(' Mesure introuvable ');
    }
    return mesure;
  }

  async update(
    id: number,
    updateMesureDto: UpdateMesureDto,
    userId: number,
  ): Promise<Mesure> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return await this.databaseService.mesure.update({
      where: { id },
      data: {
        ...updateMesureDto,
        utilisateurId: user.id,
      },
    });
  }

  async remove(id: number, userId: number) {
    const mesure = await this.databaseService.mesure.findFirst({
      where: {
        id: id,
        utilisateurId: userId,
      },
    });

    if (!mesure) {
      throw new NotFoundException(
        `Mesure avec l'ID ${id} introuvable pour cet utilisateur`,
      );
    }

    try {
      // 2. Suppression effective
      return await this.databaseService.mesure.delete({
        where: { id },
      });
    } catch {
      // Si la mesure est utilisée dans une commande (clé étrangère)
      throw new BadRequestException(
        'Impossible de supprimer cette mesure car elle est utilisée dans une commande existante.',
      );
    }
  }
}
