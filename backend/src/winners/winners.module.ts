import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinnersController } from './winners.controller';
import { Winners } from './winners.entity';
import { WinnersService } from './winners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Winners])],
  controllers: [WinnersController],
  providers: [WinnersService],
})
export class WinnersModule {}
