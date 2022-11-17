import { Controller, Get, Post, Req } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(readonly gameService: GameService) {}

  @Get()
  getAllGame() {
    return this.gameService.getAllGame();
  }

  @Post('/create')
  createGame(@Req() req) {
    return this.gameService.createGame(req.body);
  }
}
