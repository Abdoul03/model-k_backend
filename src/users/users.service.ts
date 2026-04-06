import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { Role, Utilisateur } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const saltRounds: number = 10;
@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<Utilisateur> {
    const passwordHash = await bcrypt.hash(
      createUserDto.motDePasse,
      saltRounds,
    );

    return await this.databaseService.$transaction(async (prisma) => {
      const user = await prisma.utilisateur.create({
        data: {
          nom: createUserDto.nom,
          prenom: createUserDto.prenom,
          email: createUserDto.email,
          telephone: createUserDto.telephone,
          motDePasse: passwordHash,
          adresse: createUserDto.adresse,
          role: createUserDto.role as Role,
        },
      });

      if (!user) {
        throw new BadRequestException(
          "Erreur lors de la creation de l'utilisateur",
        );
      }

      return user;
    });
  }

  async findAll(role?: Role): Promise<Utilisateur[]> {
    if (!role) {
      const user = await this.databaseService.utilisateur.findMany({
        where: {
          role,
        },
      });
      if (!user) {
        throw new NotFoundException(
          `Aucun utilisateur avec le role ${role} trouvé`,
        );
      }
      return user;
    }
    return await this.databaseService.utilisateur.findMany();
  }

  async findOne(id: number): Promise<Utilisateur> {
    const user = await this.databaseService.utilisateur.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(
        `L'utilisateur avec l'id ${id} n'a pas été trouvé`,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Utilisateur> {
    let hashedPassword: string | undefined;
    if (updateUserDto.motDePasse) {
      hashedPassword = await bcrypt.hash(updateUserDto.motDePasse, saltRounds);
    }
    return await this.databaseService.utilisateur.update({
      where: { id },
      data: {
        ...updateUserDto,
        motDePasse: hashedPassword ?? undefined,
        role: updateUserDto.role ? updateUserDto.role : undefined,
      },
    });
  }

  async remove(id: number): Promise<Utilisateur> {
    return await this.databaseService.utilisateur.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Utilisateur | null> {
    const user = await this.databaseService.utilisateur.findUnique({
      where: { email },
    });
    return user;
  }

  async verifyPassWord(
    plainMotDePasse: string,
    hashedMotDePasse: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainMotDePasse, hashedMotDePasse);
  }
}
