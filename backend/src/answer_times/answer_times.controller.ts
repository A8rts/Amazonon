import { Controller, Post, Req } from '@nestjs/common';
import { AnswerTimesService } from './answer_times.service';

@Controller('answer-times')
export class AnswerTimesController {
  constructor(private readonly answerTimesService: AnswerTimesService) {}

  @Post('/create')
  create(@Req() req) {
    return this.answerTimesService.create(req.body.gameKey);
  }

  @Post('/getTime') // get date of answer time
  getTime(@Req() req) {
    return this.answerTimesService.getTime(req.body.gameKey);
  }
}
