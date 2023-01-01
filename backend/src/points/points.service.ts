import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Points } from '@/points/points.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Points) private pointsRepository: Repository<Points>,
  ) {}

  createPoints(gameKey: string, username: string) {
    const point = new Points();
    point.username = username;
    point.game_key = gameKey;
    point.coins = 2; // default coin for players

    return this.pointsRepository.save(point);
  }

  async checkCreatedPoints(gameKey: string, username: string) {
    const points = await this.pointsRepository.findBy({
      game_key: gameKey,
      username: username,
    });

    if (points.length > 0) {
      return 'created';
    }

    return 'not_created';
  }

  async getCoint(gameKey: string, username: string) {
    return this.pointsRepository.findOneBy({
      game_key: gameKey,
      username: username,
    });
  }

  async applyResults(gameKey: string, result: any) {
    for (let i = 0; i < result.length; i++) {
      const old_coin = await this.pointsRepository.findOneBy({
        game_key: gameKey,
        username: result[i].username,
      });

      if (result[i].status_of_answers !== 'wrong') {
        // if player answer to question is right, add coin to player :)
        const new_old_coin = old_coin.coins + result[i].choosed_bead;

        this.pointsRepository
          .createQueryBuilder()
          .update(Points)
          .set({ coins: old_coin.coins + result[i].choosed_bead })
          .where('game_key = :gameKey', { gameKey: gameKey })
          .andWhere('username = :username', { username: result[i].username })
          .execute();

        if (result[i].type == 'add') {
          this.pointsRepository
            .createQueryBuilder()
            .update(Points)
            .set({ coins: new_old_coin + result[i].coin }) // add some coin to player
            .where('game_key = :gameKey', { gameKey: gameKey })
            .andWhere('username = :username', { username: result[i].username })
            .execute();
        } else if (
          result[i].type == 'remove' &&
          new_old_coin - result[i].coin >= 0
        ) {
          this.pointsRepository
            .createQueryBuilder()
            .update(Points)
            .set({ coins: new_old_coin - result[i].coin }) // delete some coin from player
            .where('game_key = :gameKey', { gameKey: gameKey })
            .andWhere('username = :username', { username: result[i].username })
            .execute();
        }
      } else {
        if (result[i].type == 'add') {
          this.pointsRepository
            .createQueryBuilder()
            .update(Points)
            .set({ coins: old_coin.coins + result[i].coin }) // add some coin to player
            .where('game_key = :gameKey', { gameKey: gameKey })
            .andWhere('username = :username', { username: result[i].username })
            .execute();
        } else if (
          result[i].type == 'remove' &&
          old_coin.coins - result[i].coin >= 0
        ) {
          this.pointsRepository
            .createQueryBuilder()
            .update(Points)
            .set({ coins: old_coin.coins - result[i].coin }) // delete some coin from player
            .where('game_key = :gameKey', { gameKey: gameKey })
            .andWhere('username = :username', { username: result[i].username })
            .execute();
        }
      }
    }

    return 'results are applyded :)))';
  }

  getAllCoinsFromGame(gameKey: string) {
    return this.pointsRepository.findBy({ game_key: gameKey });
  }
}
