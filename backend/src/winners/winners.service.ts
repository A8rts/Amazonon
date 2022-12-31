import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Winners } from './winners.entity';

@Injectable()
export class WinnersService {
  constructor(
    @InjectRepository(Winners)
    private winnersRepository: Repository<Winners>,
  ) {}

  create(gameKey: string, winners: any) {
    const wins = new Winners();
    wins.game_key = gameKey;
    wins.winners = winners;

    return this.winnersRepository.save(wins);
  }

  getAll(gameKey: string) {
    return this.winnersRepository.findOneBy({ game_key: gameKey });
  }
}
