import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';
import { Repository } from 'typeorm';
import { Questions } from '@/questions/questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
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

    const questions = [];
    for (let i = 0; i < gameSubjects.length; i++) {
      // get all question from gameSubjects
      questions.push(
        await this.questionsRepository.findBy({ subject: gameSubjects[i] }),
      );
    }

    const previous_questions = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });

    const previous_questions_id = []; // all prev questions id(from games)

    for (let i = 0; i < previous_questions.length; i++) {
      previous_questions_id.push(previous_questions[i].question_id);
    }

    const repetition_questions_id = [];
    for (let q = 0; q < questions.length; q++) {
      // get all questions we should remove from questions array
      for (let k = 0; k < questions[q].length; k++) {
        for (let p = 0; p < previous_questions_id.length; p++) {
          if (questions[q][k].id == previous_questions_id[p]) {
            repetition_questions_id.push(previous_questions_id[p]);
          }
        }
      }
    }

    const new_questions = [];
    for (let a = 0; a < questions.length; a++) {
      // make clean array off all questions
      for (let b = 0; b < questions[a].length; b++) {
        new_questions.push(questions[a][b]);
      }
    }

    const remove_len = [];
    for (let c = 0; c < repetition_questions_id.length; c++) {
      // save length we should delete they are in our questions array
      for (let d = 0; d < new_questions.length; d++) {
        if (new_questions[d].id == repetition_questions_id[c]) {
          remove_len.push(d);
        }
      }
    }

    for (let l = 0; l < remove_len.length; l++) {
      // delete they are
      delete new_questions[l];
    }

    const prepared_questions = [];
    //now we have clean and prepared questions to use that for player :D
    new_questions.map((q) => {
      q !== null ? prepared_questions.push(q) : null;
    });

    return prepared_questions;
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
