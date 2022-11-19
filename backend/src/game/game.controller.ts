import { Controller, Get, Post, Req } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(readonly gameService: GameService) {}

  @Get('public')
  getAllPublicGames() {
    return this.gameService.getAllPublicGames('public');
  }

  @Post('/create')
  createGame(@Req() req) {
    return this.gameService.createGame(req.body);
  }

  @Post('/valid_key') // for validate key when users join games
  validKey(@Req() req) {
    return this.gameService.validKey(req.body.key);
  }
}
