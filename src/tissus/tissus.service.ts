import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTissusDto } from './dto/create-tissus.dto';
import { UpdateTissusDto } from './dto/update-tissus.dto';
import { DatabaseService } from '../database/database.service';
import { MediaService } from '../media/media.service';
import { Media } from '../media/entities/media.entity';

@Injectable()
export class TissusService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mediaService: MediaService,
  ) {}

  async create(createTissusDto: CreateTissusDto, files: Express.Multer.File[]) {
    return await this.databaseService.$transaction(async (prisma) => {
      const tissus = await prisma.tissus.create({
        data: {
          type: createTissusDto.type,
          couleur: createTissusDto.couleur,
          texture: createTissusDto.texture,
          prixParMetre: Number(createTissusDto.prixParMetre),
          stock: Number(createTissusDto.stock),
        },
      });

      const createdMedias: Media[] = [];
      const nom: string = 'Image tissu';

      for (const file of files) {
        const media = await this.mediaService.create(nom, file);

        const linkedMedia = await prisma.media.update({
          where: { id: media.id },
          data: { tissusId: tissus.id },
        });
        createdMedias.push(linkedMedia);
      }

      return {
        tissus,
        medias: createdMedias,
      };
    });
  }

  async findAll() {
    const tissus = await this.databaseService.tissus.findMany({
      include: {
        medias: true,
      },
    });
    return tissus;
  }

  async findOne(id: number) {
    const tissu = await this.databaseService.tissus.findUnique({
      where: { id },
      include: {
        medias: true,
      },
    });
    return tissu;
  }

  async update(
    id: number,
    updateTissusDto: UpdateTissusDto,
    files?: Express.Multer.File[],
  ) {
    const tissu = await this.databaseService.tissus.findUnique({
      where: { id },
      include: {
        medias: true,
      },
    });

    if (!tissu) {
      throw new NotFoundException('Tissu introuvable');
    }
    return await this.databaseService.$transaction(async (prisma) => {
      const updateTissu = await prisma.tissus.update({
        where: { id },
        data: {
          type: updateTissusDto.type ?? tissu.type,
          couleur: updateTissusDto.couleur ?? tissu.couleur,
          texture: updateTissusDto.texture ?? tissu.texture,
          prixParMetre: Number(
            updateTissusDto.prixParMetre ?? tissu.prixParMetre,
          ),
          stock: Number(updateTissusDto.stock ?? tissu.stock),
        },
      });

      const nom: string = 'Image tissu';

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          if (tissu.couleur[i]) {
            await this.mediaService.update(
              tissu.medias[i].id,
              tissu.medias[i].nom,
              files[i],
            );
          } else {
            const newMedia = await this.mediaService.create(nom, files[i]);
            await prisma.media.update({
              where: { id: newMedia.id },
              data: { tissusId: updateTissu.id },
            });
          }
        }
      }
      return updateTissu;
    });
  }

  async remove(id: number) {
    const tissu = await this.databaseService.tissus.findUnique({
      where: { id },
      include: {
        medias: true,
      },
    });

    if (!tissu) {
      throw new NotFoundException('Tissu introuvable');
    }

    for (const media of tissu.medias) {
      await this.mediaService.remove(media.id);
    }

    await this.databaseService.tissus.delete({
      where: { id },
    });
    return {
      message: `Le tissu et tous ses médias ont été supprimés.`,
    };
  }
}
