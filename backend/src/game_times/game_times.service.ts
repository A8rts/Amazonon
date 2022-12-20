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
    gameTime.status = 'running';

    this.gameTimesRepository.save(gameTime);
  }

  async finishGameTime(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    return this.gameTimesRepository
      .createQueryBuilder()
      .update(GameTimes)
      .set({ status: 'finished' })
      .where('game_key = :gameKey', { gameKey: gameKey })
      .andWhere('id = :id', {
        id: lastGameTime.id,
      })
      .execute();
  }

  async checkGameTimeStatus(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    return this.gameTimesRepository.findOneBy({
      game_key: gameKey,
      id: lastGameTime.id,
    });
  }
}
