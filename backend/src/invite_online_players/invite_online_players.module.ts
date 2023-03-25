import { Module } from '@nestjs/common';
import { InviteOnlinePlayersService } from './invite_online_players.service';
import { InviteOnlinePlayersController } from './invite_online_players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteOnlinePlayers } from './invite_online_players.entity';
import { InviteOnlinePlayersGateway } from './invite_online_players.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([InviteOnlinePlayers])],
  providers: [InviteOnlinePlayersService , InviteOnlinePlayersGateway],
  controllers: [InviteOnlinePlayersController],
})
export class InviteOnlinePlayersModule {}
