import { Module } from '@nestjs/common';
import { CustumOptionService } from './custum-option.service';
import { CustumOptionController } from './custum-option.controller';

@Module({
  controllers: [CustumOptionController],
  providers: [CustumOptionService],
})
export class CustumOptionModule {}
