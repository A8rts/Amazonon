import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InviteOnlinePlayers } from './invite_online_players.entity';

@Injectable()
export class InviteOnlinePlayersService {
  constructor(
    @InjectRepository(InviteOnlinePlayers)
    private InviteOnlinePlayersRepository: Repository<InviteOnlinePlayers>,
  ) {}

  create(gameKey: string, to_user: string) {
    const invite_online_players = new InviteOnlinePlayers();
    invite_online_players.from_game_key = gameKey;
    invite_online_players.to_user = to_user;
    invite_online_players.date = new Date();

    return this.InviteOnlinePlayersRepository.save(invite_online_players);
  }

  async checkItIsFirstRequestToPlayer(gameKey: string, to_user: string) {
    const prevRequest = await this.InviteOnlinePlayersRepository.findOneBy({
      from_game_key: gameKey,
      to_user: to_user,
    });

    if (prevRequest == undefined || prevRequest == null) {
      return true;
    } else {
      return false;
    }
  }
}
