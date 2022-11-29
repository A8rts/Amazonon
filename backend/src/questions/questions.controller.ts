import { Controller, Get, Post, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(readonly questionsService: QuestionsService) {}

  @Get()
  getAllQuestion() {
    return this.questionsService.getAll();
  }

  @Post('/addQuestion')
  addQuestion(@Req() req) {
    return this.questionsService.addQuestion(req.body);
  }
}
