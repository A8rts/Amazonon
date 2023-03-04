import { Module } from '@nestjs/common';
import { PointsService } from '@/points/points.service';
import { PointsController } from '@/points/points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Points } from '@/points/points.entity';
import { User } from '@/authentication/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Points , User])],
  providers: [PointsService],
  controllers: [PointsController],
})
export class PointsModule {}
