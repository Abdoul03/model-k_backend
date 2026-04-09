import { Test, TestingModule } from '@nestjs/testing';
import { CustumOptionService } from './custum-option.service';

describe('CustumOptionService', () => {
  let service: CustumOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustumOptionService],
    }).compile();

    service = module.get<CustumOptionService>(CustumOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
