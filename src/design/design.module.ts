import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { DatabaseModule } from '../database/database.module';
import { CategorieModule } from '../categorie/categorie.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [DatabaseModule, CategorieModule, MediaModule],
  controllers: [DesignController],
  providers: [DesignService],
  exports: [DesignService],
})
export class DesignModule {}
