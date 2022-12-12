import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beads } from './beads.entity';
import { Bettings } from './bettings.entity';
import { Game } from './game.entity';
import { GameTimes } from './game_times.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
    @InjectRepository(Beads)
    private beadsRepository: Repository<Beads>,
    @InjectRepository(Bettings)
    private bettingsRepository: Repository<Bettings>,
  ) {}

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

  changeBeads(key: any) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ choose_beads: true })
      .where('key = :key', { key: key })
      .execute();
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
    const lastBead = beads.slice(-1)[0];
    console.log(gameTimes);

    if (
      lastBead.game_time_id !== undefined &&
      lastGame.id == lastBead.game_time_id
    ) {
      return true;
    } else {
      return 'no';
    }
  }

  async checkClosedBeads(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    const allGameTimeBeads = await this.beadsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    return allGameTimeBeads;
  }

  chooseBeadsFinished(key: string) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ choose_beads: false, betting: true })
      .where('key = :key', { key: key })
      .execute();
  }

  async saveBettings(betting_list: any, gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    const bet_l = [];

    for (let i = 0; i < betting_list.length; i++) {
      const bet = new Bettings();
      bet.game_key = gameKey;
      bet.game_time_id = lastGameTime.id;
      bet.username = betting_list[i].name;
      bet.to_player = betting_list[i].to;
      bet_l.push(bet);

      this.bettingsRepository.save(bet);
    }

    return bet_l;
  }

  async checkBettingCreated(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

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
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    const betting_list = await this.bettingsRepository.findBy({
      game_key: gameKey,
      game_time_id: lastGameTime.id,
    });

    return betting_list;
  }
}
