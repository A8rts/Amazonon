import { User } from '@/authentication/users/users.entity';
import { Game } from '@/game/game.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Winners } from './winners.entity';

@Injectable()
export class WinnersService {
  constructor(
    @InjectRepository(Winners)
    private winnersRepository: Repository<Winners>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(gameKey: string, winners: any) {
    const wins = new Winners();
    wins.game_key = gameKey;
    wins.winners = winners;

    return this.winnersRepository.save(wins);
  }

  async updateNumberOfWinsUsers(gameKey: string, winners: any) {
    const game = await this.gameRepository.findOneBy({ key: gameKey });

    if (game.winner_is_setted == false) {
      this.gameRepository
        .createQueryBuilder()
        .update(Game)
        .set({ winner_is_setted: true })
        .where('key = :key', { key: gameKey })
        .execute();

      const wins = new Winners();
      wins.game_key = gameKey;
      wins.winners = winners;

      for (let i = 0; i < winners.length; i++) {
        const user = await this.usersRepository.findOneBy({
          username: winners[i],
        });

        let old_number_of_wins = user.number_of_wins;

        this.usersRepository
          .createQueryBuilder()
          .update(User)
          .set({ number_of_wins: old_number_of_wins + 1 })
          .where('username = :username', { username: winners[i] })
          .execute();
      }
    }
  }

  getAll(gameKey: string) {
    return this.winnersRepository.findOneBy({ game_key: gameKey });
  }
}
