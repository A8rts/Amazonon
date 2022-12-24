import { GameTimes } from '@/game_times/game_times.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayAgainTimesController } from '@play_again/play_again_times.controller';
import { PlayAgainTimesService } from '@play_again/play_again_times.service';
import { PlayAgainTimes } from '@play_again/play_again_times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayAgainTimes, GameTimes])],
  controllers: [PlayAgainTimesController],
  providers: [PlayAgainTimesService],
})
export class PlayAgainTimesModule {}
