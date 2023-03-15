import { Module } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UsersController } from '@users/users.controller';
import { User } from '@users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';
import { UsersGateway } from './users.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User, GameTimes])],
  providers: [UsersService, UsersGateway],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
