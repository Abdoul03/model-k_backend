import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DesignController],
  providers: [DesignService],
  exports: [DesignModule],
})
export class DesignModule {}
