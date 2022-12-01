import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
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

  async findQuestion(gameSubjects: any) {
    // find question from questions repository
    const questions = [];
    for (let i = 0; i < gameSubjects.length; i++) {
      questions.push(
        await this.questionsRepository.findBy({ subject: gameSubjects[i] }),
      );
    }

    return questions;
  }
}
