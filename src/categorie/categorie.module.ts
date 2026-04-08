import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategorieController],
  providers: [CategorieService],
  exports: [CategorieModule],
})
export class CategorieModule {}
