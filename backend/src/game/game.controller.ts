import { Controller, Get, Post, Req } from '@nestjs/common';
import { GameService } from '@/game/game.service';

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

  @Post('/info')
  getInfo(@Req() req) {
    return this.gameService.getInfo(req.body.key);
  }

  @Post('/change_status')
  changeStatus(@Req() req) {
    return this.gameService.changeStatus(req.body.key, req.body.type);
  }

  @Post('/changeStart')
  changeStart(@Req() req) {
    return this.gameService.changeStart(req.body.key);
  }

  @Post('/updateConsumedQuestions')
  updateConsumedQuestions(@Req() req) {
    return this.gameService.updateConsumedQuestions(req.body.question_id , req.body.gameKey);
  }

  @Post('/changeBeads') // change choose_beads cloumn to true in database
  changeBeads(@Req() req) {
    return this.gameService.changeBeads(req.body.key);
  }

  @Post('/getMaxCoin')
  getMaxCoin(@Req() req) {
    return this.gameService.getMaxCoin(req.body.gameKey);
  }

  @Post('/chooseBeadsFinished')
  // change choose_beads cloumn false true in database
  chooseBeadsFinished(@Req() req) {
    return this.gameService.chooseBeadsFinished(req.body.gameKey);
  }

  @Post('/setAnswerTime')
  // time to show answer input to players
  setAnswerTime(@Req() req) {
    return this.gameService.setAnswerTime(req.body.gameKey);
  }

  @Post('/itIsResultTime')
  // time to show answer input to players
  itIsResultTime(@Req() req) {
    return this.gameService.itIsResultTime(req.body.gameKey);
  }

  @Post('/setPlayAgain')
  // make default conditions in the game
  setPlayAgain(@Req() req) {
    return this.gameService.setPlayAgain(req.body.gameKey);
  }

  @Post('/changeGameSubjects')
  // set ended to true (for show winners)
  changeGameSubjects(@Req() req) {
    return this.gameService.changeGameSubjects(
      req.body.gameKey,
      req.body.subjects,
    );
  }

  @Post('/gameEnded')
  // set ended to true (for show winners)
  gameEnded(@Req() req) {
    return this.gameService.gameEnded(req.body.gameKey);
  }
}
