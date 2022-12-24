import { Controller, Post, Req } from '@nestjs/common';
import { PlayAgainTimesService } from '@play_again/play_again_times.service';

@Controller('play-again-times')
export class PlayAgainTimesController {
  constructor(private readonly playAgainTimesService: PlayAgainTimesService) {}

  @Post('/create')
  create(@Req() req) {
    return this.playAgainTimesService.create(req.body.gameKey);
  }

  @Post('/checkPlayAgainTimeCreated')
  checkPlayAgainTimeCreated(@Req() req) {
    return this.playAgainTimesService.checkPlayAgainTimeCreated(
      req.body.gameKey,
    );
  }
}
