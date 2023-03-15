import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';
import { Repository } from 'typeorm';
import { Questions } from '@/questions/questions.entity';
import { Game } from '@/game/game.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  getAll() {
    return this.questionsRepository.find();
  }

  addQuestion(questionData: any) {
    const question = new Questions();
    question.subject = questionData.subject;
    question.question = questionData.question;
    question.guide1 = questionData.guide1;
    question.guide2 = questionData.guide2;
    question.answer = questionData.answer;

    return this.questionsRepository.save(question);
  }

  async findQuestion(gameSubjects: any, gameKey: string) {
    // find question from questions repository and remove all repetitious questions
    const game = await this.gameRepository.findOneBy({ key: gameKey });

    const questions = [];
    for (let i = 0; i < gameSubjects.length; i++) {
      // get all question from gameSubjects
      questions.push(
        await this.questionsRepository.findBy({ subject: gameSubjects[i] }),
      );
    }

    const all_questions_with_subjects: any = [];
    for (let j = 0; j < questions.length; j++) {
      for (let a = 0; a < questions[j].length; a++) {
        all_questions_with_subjects.push(questions[j][a]);
      }
    }

    const unavailable_questions: any = [];
    for (let u = 0; u < game.consumed_questions.length; u++) {
      unavailable_questions.push(parseInt(String(game.consumed_questions[u])));
    }

    for (let a = 0; a < all_questions_with_subjects.length; a++) {
      for (let b = 0; b < unavailable_questions.length; b++) {
        if (all_questions_with_subjects[a].id == unavailable_questions[b]) {
          delete all_questions_with_subjects[a];
          break;
        }
      }
    }

    const available_questions: any = [];
    for (let x = 0; x < all_questions_with_subjects.length; x++) {
      // clean array of available questions :))))
      if (
        all_questions_with_subjects[x] !== undefined &&
        all_questions_with_subjects[x] != null &&
        all_questions_with_subjects[x] !== ''
      ) {
        available_questions.push(all_questions_with_subjects[x]);
      }
    }

    return available_questions;
  }

  async getQuestion(gameKey: string) {
    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];
    const questionId = Number(lastGameTime.question_id);

    return this.questionsRepository.findOneBy({ id: questionId });
  }
}
