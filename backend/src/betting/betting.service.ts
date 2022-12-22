import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';
import { Repository } from 'typeorm';
import { Bettings } from '@/betting/bettings.entity';

@Injectable()
export class BettingService {
  constructor(
    @InjectRepository(Bettings)
    private bettingsRepository: Repository<Bettings>,
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

  async saveBettings(betting_list: any, gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const bet_l = [];

    for (let i = 0; i < betting_list.length; i++) {
      const bet = new Bettings();
      bet.game_key = gameKey;
      bet.game_time_id = lastGameTime.id;
      bet.username = betting_list[i].name;
      bet.to_player = betting_list[i].to;
      bet.status = 'not_done';
      bet.bet_coin = 0;
      bet_l.push(bet);

      this.bettingsRepository.save(bet);
    }

    return bet_l;
  }

  async checkBettingCreated(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const betting_list = await this.bettingsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    if (betting_list.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async getBettingList(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const betting_list = await this.bettingsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    return betting_list;
  }

  async setDoneBetting(gameKey: string, username: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    return this.bettingsRepository
      .createQueryBuilder()
      .update(Bettings)
      .set({ status: 'done' })
      .where('game_key = :gameKey', { gameKey: gameKey })
      .andWhere('game_time_id = :game_time_id', {
        game_time_id: lastGameTime.id,
      })
      .andWhere('username = :username', { username: username })
      .execute();
  }

  async checkBettingDone(gameKey: string, username: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const user_bet = await this.bettingsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
      username: username,
    });

    if (user_bet.length > 0) {
      if (user_bet[0].status == 'done') {
        return true;
      }
    }

    return false;
  }

  async countBettingDones(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const bettings = await this.bettingsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    let count = 0;

    for (let i = 0; i < bettings.length; i++) {
      if (bettings[i].status == 'done') {
        count++;
      }
    }

    return count;
  }

  async updateBettingCoin(gameKey: string, username: string, bet_coin: number) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    return this.bettingsRepository
      .createQueryBuilder()
      .update(Bettings)
      .set({ bet_coin: bet_coin })
      .where('game_key = :gameKey', { gameKey: gameKey })
      .andWhere('game_time_id = :game_time_id', {
        game_time_id: lastGameTime.id,
      })
      .andWhere('username = :username', { username: username })
      .execute();
  }
}
