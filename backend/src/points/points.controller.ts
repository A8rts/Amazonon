import { Controller, Post, Req } from '@nestjs/common';
import { PointsService } from './points.service';

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
}
