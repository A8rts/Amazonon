import { Test, TestingModule } from '@nestjs/testing';
import { GameTimesService } from './game_times.service';

describe('GameTimesService', () => {
  let service: GameTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameTimesService],
    }).compile();

    service = module.get<GameTimesService>(GameTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
