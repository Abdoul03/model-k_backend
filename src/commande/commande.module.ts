import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { MesureModule } from '../mesure/mesure.module';
import { PaiementModule } from '../paiement/paiement.module';

@Module({
  imports: [DatabaseModule, UsersModule, MesureModule, PaiementModule],
  controllers: [CommandeController],
  providers: [CommandeService],
  exports: [CommandeService],
})
export class CommandeModule {}
