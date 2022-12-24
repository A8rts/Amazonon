import { GameTimes } from '@/game_times/game_times.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayAgainTimes } from '@play_again/play_again_times.entity';

@Injectable()
export class PlayAgainTimesService {
  constructor(
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
    @InjectRepository(PlayAgainTimes)
    private playAgainTimesRepository: Repository<PlayAgainTimes>,
  ) {}

  async create(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    const playAgainTime = new PlayAgainTimes();
    playAgainTime.game_key = gameKey;
    playAgainTime.game_time_id = lastGameTime.id;
    playAgainTime.date = new Date();

    this.playAgainTimesRepository.save(playAgainTime);
  }

  async checkPlayAgainTimeCreated(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    const playAgainTimes = await this.playAgainTimesRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    if (playAgainTimes.length <= 0) {
      return 'not_created';
    } else {
      return playAgainTimes;
    }
  }
}
