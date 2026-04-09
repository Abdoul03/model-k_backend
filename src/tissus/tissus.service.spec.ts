import { Test, TestingModule } from '@nestjs/testing';
import { TissusService } from './tissus.service';

describe('TissusService', () => {
  let service: TissusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TissusService],
    }).compile();

    service = module.get<TissusService>(TissusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
