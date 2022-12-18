import { Test, TestingModule } from '@nestjs/testing';
import { AnswerTimesController } from './answer_times.controller';

describe('AnswerTimesController', () => {
  let controller: AnswerTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerTimesController],
    }).compile();

    controller = module.get<AnswerTimesController>(AnswerTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
