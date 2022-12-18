import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTimes } from 'src/game_times/game_times.entity';
import { AnswerTimesController } from './answer_times.controller';
import { AnswerTimes } from './answer_times.entity';
import { AnswerTimesService } from './answer_times.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerTimes, GameTimes])],
  controllers: [AnswerTimesController],
  providers: [AnswerTimesService],
})
export class AnswerTimesModule {}
