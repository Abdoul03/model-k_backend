import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PaiementController],
  providers: [PaiementService],
  exports: [PaiementService],
})
export class PaiementModule {}
