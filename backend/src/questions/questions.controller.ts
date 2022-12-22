import { Controller, Get, Post, Req } from '@nestjs/common';
import { QuestionsService } from '@/questions/questions.service';

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

  @Post('/findQuestion')
  findQuestion(@Req() req) {
    return this.questionsService.findQuestion(req.body.gameSubjects);
  }

  @Post('/getQuestion')
  getQuestion(@Req() req) {
    return this.questionsService.getQuestion(req.body.gameKey);
  }
}
