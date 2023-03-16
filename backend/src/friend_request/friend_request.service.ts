import { User } from '@/authentication/users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from './friend_request.entity';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(from: string, to: string) {
    const to_user = await this.userRepository.findOneBy({ username: to });

    if (to_user.online == true) {
      const friend_request = new FriendRequest();
      friend_request.from = from;
      friend_request.to = to;
      friend_request.status = 'no_answer';
      friend_request.date = new Date();

      return this.friendRequestRepository.save(friend_request);
    } else {
      return 'user-is-offline';
    }
  }

  async checkCanSendFriendRequest(from_username: string, to_username: string) {
    const prevFriendRequest = await this.friendRequestRepository.findOneBy({
      from: from_username,
      to: to_username,
    });

    if (prevFriendRequest == null || prevFriendRequest == undefined) {
      return true;
    } else {
      return prevFriendRequest;
    }
  }
}
