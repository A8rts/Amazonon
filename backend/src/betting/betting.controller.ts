import { Controller, Post, Req } from '@nestjs/common';
import { BettingService } from './betting.service';

@Controller('betting')
export class BettingController {
  constructor(readonly bettingService: BettingService) {}

  @Post('/saveBettings')
  //when choose bead section in game is finished
  saveBettings(@Req() req) {
    return this.bettingService.saveBettings(
      req.body.betting_list,
      req.body.gameKey,
    );
  }

  @Post('/checkBettingCreated')
  //check creator create the betting list on databsae or not
  checkBettingCreated(@Req() req) {
    return this.bettingService.checkBettingCreated(req.body.gameKey);
  }

  @Post('/getBettingList')
  getBettingList(@Req() req) {
    return this.bettingService.getBettingList(req.body.gameKey);
  }

  @Post('/setDoneBetting')
  // when player say my betting is done we change it in database
  setDoneBetting(@Req() req) {
    return this.bettingService.setDoneBetting(
      req.body.gameKey,
      req.body.username,
    );
  }

  @Post('/checkBettingDone')
  // check the player is finished the betting section or not
  checkBettingDone(@Req() req) {
    return this.bettingService.checkBettingDone(
      req.body.gameKey,
      req.body.username,
    );
  }

  @Post('/countBettingDones')
  // for count all dones betting in the game
  countBettingDones(@Req() req) {
    return this.bettingService.countBettingDones(req.body.gameKey);
  }

  @Post('/updateBettingCoin')
  // for save bet coin to players
  updateBettingCoin(@Req() req) {
    return this.bettingService.updateBettingCoin(
      req.body.gameKey,
      req.body.username,
      req.body.coin,
    );
  }
}
