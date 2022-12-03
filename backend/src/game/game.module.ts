import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [QuestionsModule, TypeOrmModule.forFeature([Game])],
  providers: [GameService, GameGateway],
  controllers: [GameController],
})
export class GameModule {}
