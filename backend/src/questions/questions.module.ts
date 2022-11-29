import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
