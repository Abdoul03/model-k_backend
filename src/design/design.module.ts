import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { DatabaseModule } from '../database/database.module';
import { CategorieModule } from '../categorie/categorie.module';

@Module({
  imports: [DatabaseModule, CategorieModule],
  controllers: [DesignController],
  providers: [DesignService],
  exports: [DesignModule],
})
export class DesignModule {}
