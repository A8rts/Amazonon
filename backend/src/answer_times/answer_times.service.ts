import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';
import { Repository } from 'typeorm';
import { AnswerTimes } from '@/answer_times/answer_times.entity';

@Injectable()
export class AnswerTimesService {
  constructor(
    @InjectRepository(AnswerTimes)
    private answerTimesRepository: Repository<AnswerTimes>,
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
  ) {}

  async findLastGameTime(gameKey: string) {
    // find last game time in the game with key :)
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    return lastGameTime;
  }

  async create(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const answerTime = new AnswerTimes();
    answerTime.game_key = gameKey;
    answerTime.game_time_id = lastGameTime.id;
    answerTime.date = new Date();

    return this.answerTimesRepository.save(answerTime);
  }

  async getTime(gameKey: any) {
    const lastGameTime = await this.findLastGameTime(gameKey.gameKey);

    return this.answerTimesRepository.findBy({
      game_key: gameKey.gameKey,
      game_time_id: lastGameTime.id,
    });
  }
}
