import { Module } from '@nestjs/common';
import { BeadsService } from './beads.service';
import { BeadsController } from './beads.controller';
import { Beads } from 'src/beads/beads.entity';
import { GameTimes } from 'src/game_times/game_times.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Beads, GameTimes])],
  providers: [BeadsService],
  controllers: [BeadsController],
})
export class BeadsModule {}
