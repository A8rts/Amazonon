import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Beads } from '@/beads/beads.entity';
import { GameTimes } from '@/game_times/game_times.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BeadsService {
  constructor(
    @InjectRepository(Beads)
    private beadsRepository: Repository<Beads>,
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

  async saveBead(gameKey: string, username: string, bead: any) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGame = gameTimes.slice(-1)[0]; // to get now game time data

    const beads = new Beads();
    beads.game_key = gameKey;
    beads.username = username;
    beads.bead = bead;
    beads.game_time_id = lastGame.id;

    return this.beadsRepository.save(beads);
  }

  async checkBeadSended(gameKey: string, username: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGame = gameTimes.slice(-1)[0];

    const beads = await this.beadsRepository.findBy({
      game_key: gameKey,
      username: username,
    });

    if (beads.length > 0) {
      const lastBead = beads.slice(-1)[0];

      if (
        lastBead.game_time_id !== undefined &&
        lastGame.id == lastBead.game_time_id
      ) {
        return true;
      } else {
        return 'no';
      }
    } else {
      return 'no';
    }
  }

  async checkClosedBeads(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    const allGameTimeBeads = await this.beadsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    return allGameTimeBeads;
  }

  async getBead(gameKey: string, username: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    return this.beadsRepository.findOneBy({
      game_key: gameKey,
      username: username,
      game_time_id: lastGameTime.id,
    });
  }

  async getAllBeadsFromGame(gameKey: string) {
    const lastGameTime = await this.findLastGameTime(gameKey);

    return this.beadsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });
  }
}
