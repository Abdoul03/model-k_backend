import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MesureModule } from './mesure/mesure.module';
import { CommandeModule } from './commande/commande.module';
import { PaiementModule } from './paiement/paiement.module';
import { DesignModule } from './design/design.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MesureModule,
    CommandeModule,
    PaiementModule,
    DesignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
