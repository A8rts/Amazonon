import { Controller } from '@nestjs/common';
import { Post, Req } from '@nestjs/common/decorators';
import { GameTimesService } from './game_times.service';

@Controller('game-times')
export class GameTimesController {
  constructor(readonly gameTimesService: GameTimesService) {}

  @Post('/create/game_time')
  createGameTimes(@Req() req) {
    return this.gameTimesService.createGameTime(req.body);
  }

  @Post('finishGameTime')
  finishGameTime(@Req() req) {
    return this.gameTimesService.finishGameTime(req.body.gameKey);
  }

  @Post('checkGameTimeStatus')
  checkGameTimeStatus(@Req() req) {
    return this.gameTimesService.checkGameTimeStatus(req.body.gameKey);
  }
}
