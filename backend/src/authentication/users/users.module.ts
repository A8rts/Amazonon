import { Module } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UsersController } from '@users/users.controller';
import { User } from '@users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User , GameTimes])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
