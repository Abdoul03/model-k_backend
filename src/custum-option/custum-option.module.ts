import { Module } from '@nestjs/common';
import { CustumOptionService } from './custum-option.service';
import { CustumOptionController } from './custum-option.controller';
import { DatabaseModule } from '../database/database.module';
import { DesignModule } from '../design/design.module';
import { TissusModule } from '../tissus/tissus.module';

@Module({
  imports: [DatabaseModule, DesignModule, TissusModule],
  controllers: [CustumOptionController],
  providers: [CustumOptionService],
  exports: [CustumOptionService],
})
export class CustumOptionModule {}
