import { Controller, Post, Req } from '@nestjs/common';
import { PointsService } from '@/points/points.service';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post('/createPoints')
  createPoints(@Req() req) {
    return this.pointsService.createPoints(req.body.gameKey, req.body.username);
  }

  @Post('/checkCreatedPoints') // to check we created player point data on databse or not
  checkCreatedPoints(@Req() req) {
    return this.pointsService.checkCreatedPoints(
      req.body.gameKey,
      req.body.username,
    );
  }

  @Post('/getCoint')
  getCoint(@Req() req) {
    return this.pointsService.getCoint(req.body.gameKey, req.body.username);
  }

  @Post('/applyResults') // add point to players and remove poin from players
  applyResults(@Req() req) {
    return this.pointsService.applyResults(req.body.gameKey, req.body.result);
  }

  @Post('/getAllCoinsFromGame') // get all players coins
  getAllCoinsFromGame(@Req() req) {
    return this.pointsService.getAllCoinsFromGame(req.body.gameKey);
  }
}
