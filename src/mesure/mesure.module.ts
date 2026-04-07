import { Module } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { MesureController } from './mesure.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MesureController],
  providers: [MesureService],
  exports: [MesureModule],
})
export class MesureModule {}
