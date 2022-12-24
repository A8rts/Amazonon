import { Test, TestingModule } from '@nestjs/testing';
import { PlayAgainTimesController } from './play_again_times.controller';

describe('PlayAgainTimesController', () => {
  let controller: PlayAgainTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayAgainTimesController],
    }).compile();

    controller = module.get<PlayAgainTimesController>(PlayAgainTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
