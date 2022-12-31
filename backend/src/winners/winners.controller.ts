import { Controller, Post, Req } from '@nestjs/common';
import { WinnersService } from './winners.service';

@Controller('winners')
export class WinnersController {
  constructor(private readonly winnersService: WinnersService) {}

  @Post('/create')
  create(@Req() req) {
    return this.winnersService.create(req.body.gameKey, req.body.winners);
  }

  @Post('/getAll')
  getAll(@Req() req) {
    return this.winnersService.getAll(req.body.gameKey);
  }
}
