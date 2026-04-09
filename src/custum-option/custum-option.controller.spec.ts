import { Test, TestingModule } from '@nestjs/testing';
import { CustumOptionController } from './custum-option.controller';
import { CustumOptionService } from './custum-option.service';

describe('CustumOptionController', () => {
  let controller: CustumOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustumOptionController],
      providers: [CustumOptionService],
    }).compile();

    controller = module.get<CustumOptionController>(CustumOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
