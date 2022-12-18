import { Test, TestingModule } from '@nestjs/testing';
import { AnswerTimesService } from './answer_times.service';

describe('AnswerTimesService', () => {
  let service: AnswerTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerTimesService],
    }).compile();

    service = module.get<AnswerTimesService>(AnswerTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
