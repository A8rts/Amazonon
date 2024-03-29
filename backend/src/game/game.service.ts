import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '@/game/game.entity';
import { GameTimes } from '@/game_times/game_times.entity';

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
    game.maximum_score = gameData.maximum_score;
    game.status = 'open';
    game.start = false;
    game.choose_beads = false;
    game.betting = false;
    game.answer_time = false;
    game.result_time = false;
    game.ended = false;
    game.winner_is_setted = false;
    game.consumed_questions = [];

    this.gameRepository.save(game);
    return game;
  }

  validKey(key: string) {
    return this.gameRepository.findBy({ key: key });
  }

  getInfo(key: string) {
    return this.gameRepository.findOneBy({ key: key });
  }

  async getMaxCoin(gameKey: string) {
    const game = await this.gameRepository.findOneBy({ key: gameKey });
    return game.maximum_score;
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

  async updateConsumedQuestions(question_id: any, gameKey: string) {
    const game = await this.gameRepository.findOneBy({ key: gameKey });
    const consumed_questions = game.consumed_questions;
    consumed_questions.push(question_id);

    const new_consumed_questions: any = [];
    for (let i = 0; i < consumed_questions.length; i++) {
      new_consumed_questions.push(parseInt(String(consumed_questions[i])));
    }

    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ consumed_questions: new_consumed_questions })
      .where('key = :key', { key: gameKey })
      .execute();
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

  setAnswerTime(gameKey: string) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ answer_time: true, betting: false })
      .where('key = :gameKey', { gameKey: gameKey })
      .execute();
  }

  itIsResultTime(gameKey: string) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({ answer_time: false, result_time: true })
      .where('key = :gameKey', { gameKey: gameKey })
      .execute();
  }

  setPlayAgain(gameKey: string) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({
        start: false,
        choose_beads: false,
        betting: false,
        answer_time: false,
        result_time: false,
      })
      .where('key = :gameKey', { gameKey: gameKey })
      .execute();
  }

  changeGameSubjects(gameKey: string, subjects: any) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({
        subjects: subjects,
      })
      .where('key = :gameKey', { gameKey: gameKey })
      .execute();
  }

  gameEnded(gameKey: string) {
    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set({
        start: true,
        choose_beads: false,
        betting: false,
        answer_time: false,
        result_time: false,
        ended: true,
      })
      .where('key = :gameKey', { gameKey: gameKey })
      .execute();
  }
}
