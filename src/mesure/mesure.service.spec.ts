import { Test, TestingModule } from '@nestjs/testing';
import { MesureService } from './mesure.service';

describe('MesureService', () => {
  let service: MesureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesureService],
    }).compile();

    service = module.get<MesureService>(MesureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
