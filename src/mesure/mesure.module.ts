import { Module } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { MesureController } from './mesure.controller';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [MesureController],
  providers: [MesureService],
  exports: [MesureService],
})
export class MesureModule {}
