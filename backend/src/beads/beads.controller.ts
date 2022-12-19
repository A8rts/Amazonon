import { Controller, Post, Req } from '@nestjs/common';
import { BeadsService } from './beads.service';

@Controller('beads')
export class BeadsController {
  constructor(readonly beadsService: BeadsService) {}

  @Post('/saveBead')
  saveBead(@Req() req) {
    return this.beadsService.saveBead(
      req.body.gameKey,
      req.body.username,
      req.body.bead,
    );
  }

  @Post('/checkBeadSended')
  //check the user sended the bead or not
  checkBeadSended(@Req() req) {
    return this.beadsService.checkBeadSended(
      req.body.gameKey,
      req.body.username,
    );
  }

  @Post('/checkClosedBeads')
  //check how many beads is open!
  checkClosedBeads(@Req() req) {
    return this.beadsService.checkClosedBeads(req.body.gameKey);
  }

  @Post('/getBead')
  //check how many beads is open!
  getBead(@Req() req) {
    return this.beadsService.getBead(req.body.gameKey, req.body.username);
  }
}
