import { User } from '@/authentication/users/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinnersController } from './winners.controller';
import { Winners } from './winners.entity';
import { WinnersService } from './winners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Winners , User])],
  controllers: [WinnersController],
  providers: [WinnersService],
})
export class WinnersModule {}
