import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '@/game/game.entity';
import { GameService } from '@/game/game.service';
import { GameController } from '@/game/game.controller';
import { GameGateway } from '@/game/game.gateway';
import { QuestionsModule } from '@/questions/questions.module';
import { GameTimes } from '@/game_times/game_times.entity';

@Module({
  imports: [QuestionsModule, TypeOrmModule.forFeature([Game, GameTimes])],
  providers: [GameService, GameGateway],
  controllers: [GameController],
})
export class GameModule {}
