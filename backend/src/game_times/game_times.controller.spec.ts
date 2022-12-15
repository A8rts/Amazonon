import { Test, TestingModule } from '@nestjs/testing';
import { GameTimesController } from './game_times.controller';

describe('GameTimesController', () => {
  let controller: GameTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameTimesController],
    }).compile();

    controller = module.get<GameTimesController>(GameTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
