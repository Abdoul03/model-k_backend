import { Injectable, NotFoundException } from '@nestjs/common';
import { Media } from './entities/media.entity';
import { DatabaseService } from '../database/database.service';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import 'multer';
import sharp from 'sharp';

@Injectable()
export class MediaService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(nom: string, file: Express.Multer.File): Promise<Media> {
    // Tu peux remplacer any par ton modèle Prisma Media
    const desktopPath = path.join(os.homedir(), 'Desktop', 'modolk_uploads');

    // Création du dossier si inexistant
    if (!fs.existsSync(desktopPath)) {
      fs.mkdirSync(desktopPath, { recursive: true });
    }

    const sanitizedName = file.originalname
      .replace(/\s+/g, '_') // remplace les espaces par _
      .replace(/[^a-zA-Z0-9._-]/g, '');

    const fileName = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(desktopPath, fileName);

    try {
      // .jpeg({ quality: 80 }) réduit le poids de ~70% avec une qualité quasi identique à l'oeil nu
      const compressedBuffer = await sharp(file.buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true }) // Optionnel: limite la résolution max
        .jpeg({ quality: 80, mozjpeg: true }) // mozjpeg offre une meilleure compression à qualité égale
        .toBuffer();
      // 1. Écriture physique du fichier
      fs.writeFileSync(filePath, compressedBuffer);

      // 2. Enregistrement en base de données
      return await this.databaseService.media.create({
        data: {
          nom: nom,
          path: filePath,
          imageUrl: `/uploads/${fileName}`,
        },
      });
    } catch (error) {
      // Optionnel : supprimer le fichier si la DB échoue
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      throw error;
    }
  }

  async findAll(): Promise<Media[]> {
    return await this.databaseService.media.findMany();
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.databaseService.media.findUnique({
      where: { id },
    });
    if (!media) {
      throw new NotFoundException('Media introuvable');
    }
    return media;
  }

  async update(id: number, nom: string, file?: Express.Multer.File) {
    // 1. Vérifier si le média existe
    const existingMedia = await this.databaseService.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      throw new NotFoundException('Media introuvable');
    }

    let filePath = existingMedia.path;
    let imageUrl = existingMedia.imageUrl;

    // 2. Si un nouveau fichier est fourni, on remplace l'ancien
    if (file) {
      const desktopPath = path.join(os.homedir(), 'Desktop', 'modolk_uploads');
      const fileName = `${Date.now()}-${file.originalname.split('.')[0]}.jpg`;
      const newFilePath = path.join(desktopPath, fileName);

      // Compression du nouveau fichier
      const compressedBuffer = await sharp(file.buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();

      // Suppression de l'ancien fichier physique s'il existe
      if (fs.existsSync(existingMedia.path)) {
        fs.unlinkSync(existingMedia.path);
      }

      // Écriture du nouveau fichier
      fs.writeFileSync(newFilePath, compressedBuffer);

      filePath = newFilePath;
      imageUrl = `/uploads/${fileName}`;
    }

    // 3. Mise à jour en base de données
    return await this.databaseService.media.update({
      where: { id },
      data: {
        nom: nom ?? existingMedia.nom,
        path: filePath,
        imageUrl: imageUrl,
      },
    });
  }

  async remove(id: number) {
    const existingMedia = await this.databaseService.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      throw new NotFoundException('Media introuvable');
    }

    if (fs.existsSync(existingMedia.path)) {
      fs.unlinkSync(existingMedia.path);
    }

    await this.databaseService.media.delete({
      where: { id },
    });
    return {
      message: `Media #${id} a été supprimés.`,
    };
  }
}
