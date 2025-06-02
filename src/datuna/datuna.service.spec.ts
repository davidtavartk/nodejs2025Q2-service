import { Test, TestingModule } from '@nestjs/testing';
import { DatunaService } from './datuna.service';

describe('DatunaService', () => {
  let service: DatunaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatunaService],
    }).compile();

    service = module.get<DatunaService>(DatunaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
