import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { GameTimes } from '../game_times/game_times.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
  ) {}

  // All the work related to the gameRepository is in this service //

  async findLastGameTime(gameKey: string) {
    // find last game time in the game with key :)
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    return lastGameTime;
  }

  getAllPublicGames(type: string) {
    // for test
    return this.gameRepository.findBy({ type: type });
  }

  createGame(gameData: any) {
    const game = new Game();
    const key = Math.random().toString(36).substring(2, 7);

    game.key = key.toUpperCase();
    game.creator = gameData.creator;
    game.type = gameData.type;
    game.subjects = gameData.subjects;
    game.capacity = gameData.capacity;
    game.status = 'open';
    game.start = false;
    game.choose_beads = false;
    game.betting = false;

    this.gameRepository.save(game);
    return game;
  }

  validKey(key: string) {
    return this.gameRepository.findBy({ key: key });
  }

  getInfo(key: string) {
    return this.gameRepository.findOneBy({ key: key });
  }

  changeStatus(key: string, type: string) {
    // when game is full status is close and when game is not full status is open
    if (type == 'open') {
      return this.gameRepository
        .createQueryBuilder()
        .update(Game)
        .set({ status: 'open' })
        .where('key = :key', { key: key })
        .execute();
    } else if (type == 'close') {
      return this.gameRepository
        .createQueryBuilder()
        .update(Game)
        .set({ status: 'close' })
        .where('key = :key', { key: key })
        .execute();
    }
  }

  createGameTime(gameTimeData: any) {
    const gameTime = new GameTimes();
    gameTime.game_key = gameTimeData.game_key;
    gameTime.creator = gameTimeData.creator;
    gameTime.question_id = gameTimeData.question_id;

    this.gameTimesRepository.save(gameTime);
  }

  changeStart(key: any) {
    // for when game creator started the game, we change thin event in database
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ start: true })
      .where('key = :key', { key: key })
      .execute();
  }

  chooseBeadsFinished(key: string) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ choose_beads: false, betting: true })
      .where('key = :key', { key: key })
      .execute();
  }

  changeBeads(key: any) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ choose_beads: true })
      .where('key = :key', { key: key })
      .execute();
  }
}
