import { Controller, Post, Req } from '@nestjs/common';
import { InviteOnlinePlayersService } from './invite_online_players.service';

@Controller('invite-online-players')
export class InviteOnlinePlayersController {
  constructor(
    readonly inviteOnlinePlayersService: InviteOnlinePlayersService,
  ) {}

  @Post('create')
  create(@Req() req) {
    return this.inviteOnlinePlayersService.create(
      req.body.gameKey,
      req.body.to_user,
    );
  }

  @Post('checkItIsFirstRequestToPlayer')
  checkItIsFirstRequestToPlayer(@Req() req) {
    return this.inviteOnlinePlayersService.checkItIsFirstRequestToPlayer(
      req.body.gameKey,
      req.body.to_user,
    );
  }
}
