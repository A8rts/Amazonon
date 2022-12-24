import { Test, TestingModule } from '@nestjs/testing';
import { PlayAgainTimesService } from './play_again_times.service';

describe('PlayAgainTimesService', () => {
  let service: PlayAgainTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayAgainTimesService],
    }).compile();

    service = module.get<PlayAgainTimesService>(PlayAgainTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
