import { Module } from '@nestjs/common';
import { BettingService } from '@/betting/betting.service';
import { BettingController } from '@/betting/betting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bettings } from '@/betting/bettings.entity';
import { GameTimes } from '@/game_times/game_times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bettings, GameTimes])],

  providers: [BettingService],
  controllers: [BettingController],
})
export class BettingModule {}
