import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { QuestionsModule } from 'src/questions/questions.module';
import { GameTimes } from './game_times.entity';
import { Beads } from './beads.entity';
import { Bettings } from './bettings.entity';

@Module({
  imports: [
    QuestionsModule,
    TypeOrmModule.forFeature([Game, GameTimes, Beads, Bettings]),
  ],
  providers: [GameService, GameGateway],
  controllers: [GameController],
})
export class GameModule {}
