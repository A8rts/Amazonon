import { User } from '@/authentication/users/users.entity';
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
  ) {}

  async create(gameKey: string, winners: any) {
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

  getAll(gameKey: string) {
    return this.winnersRepository.findOneBy({ game_key: gameKey });
  }
}
