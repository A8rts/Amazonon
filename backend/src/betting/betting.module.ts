import { Module } from '@nestjs/common';
import { BettingService } from './betting.service';
import { BettingController } from './betting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bettings } from './bettings.entity';
import { GameTimes } from 'src/game_times/game_times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bettings, GameTimes])],

  providers: [BettingService],
  controllers: [BettingController],
})
export class BettingModule {}
