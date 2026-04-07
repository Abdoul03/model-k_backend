import { Test, TestingModule } from '@nestjs/testing';
import { MesureController } from './mesure.controller';
import { MesureService } from './mesure.service';

describe('MesureController', () => {
  let controller: MesureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesureController],
      providers: [MesureService],
    }).compile();

    controller = module.get<MesureController>(MesureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
