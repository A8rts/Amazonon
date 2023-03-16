import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend_request.service';
import { FriendRequestController } from './friend_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './friend_request.entity';
import { User } from '@/authentication/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, User])],
  providers: [FriendRequestService],
  controllers: [FriendRequestController],
})
export class FriendRequestModule {}
