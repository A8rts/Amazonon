import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameTimes } from './game_times.entity';

@Injectable()
export class GameTimesService {
  constructor(
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
  ) {}
  createGameTime(gameTimeData: any) {
    const gameTime = new GameTimes();
    gameTime.game_key = gameTimeData.game_key;
    gameTime.creator = gameTimeData.creator;
    gameTime.question_id = gameTimeData.question_id;

    this.gameTimesRepository.save(gameTime);
  }
}
