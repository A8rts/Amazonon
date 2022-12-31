import { Test, TestingModule } from '@nestjs/testing';
import { WinnersService } from './winners.service';

describe('WinnersService', () => {
  let service: WinnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinnersService],
    }).compile();

    service = module.get<WinnersService>(WinnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
