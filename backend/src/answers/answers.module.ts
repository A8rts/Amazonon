import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTimes } from '@/game_times/game_times.entity';
import { AnswersController } from '@/answers/answers.controller';
import { Answers } from '@/answers/answers.entity';
import { AnswersService } from '@/answers/answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answers, GameTimes])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
