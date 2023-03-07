import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Points } from '@/points/points.entity';
import { User } from '@/authentication/users/users.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Points) private pointsRepository: Repository<Points>,
    @InjectRepository(User) private userRepository: Repository<User>,
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

    this.scoreAudit(result);

    return 'done!';
  }

  async scoreAudit(result: any) {
    // to list true answers and add score to players
    const right_answers = [];
    for (let r = 0; r < result.length; r++) {
      if (result[r].status_of_answers !== 'wrong') {
        right_answers.push(result[r]);
      }
    }

    for (let s = 0; s < right_answers.length; s++) {
      const oldThings = await this.userRepository.findOneBy({
        username: right_answers[s].username,
      });

      this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ score: oldThings.score + right_answers[s].choosed_bead })
        .where('username = :username', { username: right_answers[s].username })
        .execute();

      const new_score = oldThings.score + right_answers[s].choosed_bead;
      const level = new_score / 10;
      if (level >= 1) {
        this.userRepository
          .createQueryBuilder()
          .update(User)
          .set({ level: parseInt(String(level)) })
          .where('username = :username', {
            username: right_answers[s].username,
          })
          .execute();
      }
    }
  }

  getAllCoinsFromGame(gameKey: string) {
    return this.pointsRepository.findBy({ game_key: gameKey });
  }
}
