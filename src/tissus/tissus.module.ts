import { Module } from '@nestjs/common';
import { TissusService } from './tissus.service';
import { TissusController } from './tissus.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TissusController],
  providers: [TissusService],
  exports: [TissusService],
})
export class TissusModule {}
