import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTimes } from 'src/game_times/game_times.entity';
import { Repository } from 'typeorm';
import { Answers } from './answers.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answers)
    private answersRepository: Repository<Answers>,
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

  async create(gameKey: string, answer: string, username: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const answers = new Answers();
    answers.game_key = gameKey;
    answers.answer = answer;
    answers.game_time_id = lastGameTime.id;
    answers.username = username;

    return this.answersRepository.save(answers);
  }

  async checkSaved(gameKey: string, username: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    return this.answersRepository.findBy({
      game_key: gameKey,
      username: username,
      game_time_id: lastGameTime.id,
    });
  }

  async getAnswers(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    return this.answersRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });
  }
}
