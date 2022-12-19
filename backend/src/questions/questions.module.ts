import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { GameTimes } from 'src/game_times/game_times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions , GameTimes])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
