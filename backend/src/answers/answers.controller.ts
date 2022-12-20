import { Controller, Post, Req } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post('create')
  create(@Req() req) {
    return this.answersService.create(
      req.body.gameKey,
      req.body.answer,
      req.body.username,
    );
  }

  @Post('checkSaved')
  checkSaved(@Req() req) {
    return this.answersService.checkSaved(req.body.gameKey, req.body.username);
  }

  @Post('getAnswers')
  getAnswers(@Req() req) {
    return this.answersService.getAnswers(req.body.gameKey);
  }
}
