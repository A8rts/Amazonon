import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
