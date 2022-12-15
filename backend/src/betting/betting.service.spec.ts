import { Test, TestingModule } from '@nestjs/testing';
import { BettingService } from './betting.service';

describe('BettingService', () => {
  let service: BettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BettingService],
    }).compile();

    service = module.get<BettingService>(BettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
