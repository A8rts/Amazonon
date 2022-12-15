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

  @Post('/info')
  getInfo(@Req() req) {
    return this.gameService.getInfo(req.body.key);
  }

  @Post('/change_status')
  changeStatus(@Req() req) {
    return this.gameService.changeStatus(req.body.key, req.body.type);
  }

  @Post('/create/game_time')
  createGameTimes(@Req() req) {
    return this.gameService.createGameTime(req.body);
  }

  @Post('/changeStart')
  changeStart(@Req() req) {
    return this.gameService.changeStart(req.body.key);
  }

  @Post('/changeBeads')
  changeBeads(@Req() req) {
    return this.gameService.changeBeads(req.body.key);
  }

  @Post('/saveBead')
  saveBead(@Req() req) {
    return this.gameService.saveBead(
      req.body.gameKey,
      req.body.username,
      req.body.bead,
    );
  }

  @Post('/checkBeadSended')
  //check the user sended the bead or not
  checkBeadSended(@Req() req) {
    return this.gameService.checkBeadSended(
      req.body.gameKey,
      req.body.username,
    );
  }

  @Post('/checkClosedBeads')
  //check how many beads is open!
  checkClosedBeads(@Req() req) {
    return this.gameService.checkClosedBeads(req.body.gameKey);
  }

  @Post('/chooseBeadsFinished')
  //when choose bead section in game is finished
  chooseBeadsFinished(@Req() req) {
    return this.gameService.chooseBeadsFinished(req.body.gameKey);
  }

  @Post('/saveBettings')
  //when choose bead section in game is finished
  saveBettings(@Req() req) {
    return this.gameService.saveBettings(
      req.body.betting_list,
      req.body.gameKey,
    );
  }

  @Post('/checkBettingCreated')
  //check creator create the betting list on databsae or not
  checkBettingCreated(@Req() req) {
    return this.gameService.checkBettingCreated(req.body.gameKey);
  }

  @Post('/getBettingList')
  getBettingList(@Req() req) {
    return this.gameService.getBettingList(req.body.gameKey);
  }

  @Post('/setDoneBetting')
  // when player say my betting is done we change it in database
  setDoneBetting(@Req() req) {
    return this.gameService.setDoneBetting(req.body.gameKey, req.body.username);
  }

  @Post('/checkBettingDone')
  // check the player is finished the betting section or not
  checkBettingDone(@Req() req) {
    return this.gameService.checkBettingDone(
      req.body.gameKey,
      req.body.username,
    );
  }

  @Post('/countBettingDones')
  // for count all dones betting in the game
  countBettingDones(@Req() req) {
    return this.gameService.countBettingDones(req.body.gameKey);
  }

  @Post('/updateBettingCoin')
  // for save bet coin to players
  updateBettingCoin(@Req() req) {
    return this.gameService.updateBettingCoin(
      req.body.gameKey,
      req.body.username,
      req.body.coin,
    );
  }
}
