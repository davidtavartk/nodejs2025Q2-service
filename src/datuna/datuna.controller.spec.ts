import { Test, TestingModule } from '@nestjs/testing';
import { DatunaController } from './datuna.controller';
import { DatunaService } from './datuna.service';

describe('DatunaController', () => {
  let controller: DatunaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatunaController],
      providers: [DatunaService],
    }).compile();

    controller = module.get<DatunaController>(DatunaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
