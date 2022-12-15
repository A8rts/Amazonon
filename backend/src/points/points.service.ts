import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Points } from './points.entity';

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
}
