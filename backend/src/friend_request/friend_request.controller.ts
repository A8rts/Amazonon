import { Controller, Post, Req } from '@nestjs/common';
import { FriendRequestService } from './friend_request.service';

@Controller('friend-request')
export class FriendRequestController {
  constructor(readonly friendRequestService: FriendRequestService) {}

  @Post('create')
  create(@Req() req) {
    return this.friendRequestService.create(req.body.from, req.body.to);
  }

  @Post('checkCanSendFriendRequest')
  checkCanSendFriendRequest(@Req() req) {
    return this.friendRequestService.checkCanSendFriendRequest(
      req.body.from_username,
      req.body.to_username,
    );
  }
}
