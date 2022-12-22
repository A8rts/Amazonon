import { Module } from '@nestjs/common';
import { BeadsService } from '@/beads/beads.service';
import { BeadsController } from '@/beads/beads.controller';
import { Beads } from '@/beads/beads.entity';
import { GameTimes } from '@/game_times/game_times.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Beads, GameTimes])],
  providers: [BeadsService],
  controllers: [BeadsController],
})
export class BeadsModule {}
