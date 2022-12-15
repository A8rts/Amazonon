import { Module } from '@nestjs/common';
import { GameTimesService } from './game_times.service';
import { GameTimesController } from './game_times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTimes } from './game_times.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameTimes])],
  providers: [GameTimesService],
  controllers: [GameTimesController],
})
export class GameTimesModule {}
