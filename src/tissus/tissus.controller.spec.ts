import { Test, TestingModule } from '@nestjs/testing';
import { TissusController } from './tissus.controller';
import { TissusService } from './tissus.service';

describe('TissusController', () => {
  let controller: TissusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TissusController],
      providers: [TissusService],
    }).compile();

    controller = module.get<TissusController>(TissusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
