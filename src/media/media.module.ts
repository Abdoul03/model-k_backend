import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [DatabaseService],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaModule],
})
export class MediaModule {}
