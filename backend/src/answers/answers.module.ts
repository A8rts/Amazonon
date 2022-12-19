import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTimes } from 'src/game_times/game_times.entity';
import { AnswersController } from './answers.controller';
import { Answers } from './answers.entity';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answers, GameTimes])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
