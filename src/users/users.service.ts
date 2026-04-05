import { Injectable } from '@nestjs/common';
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

    return this.databaseService.$transaction(async (prisma) => {
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
      return user;
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
