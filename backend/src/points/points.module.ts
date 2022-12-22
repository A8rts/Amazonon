import { Module } from '@nestjs/common';
import { PointsService } from '@/points/points.service';
import { PointsController } from '@/points/points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Points } from '@/points/points.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Points])],
  providers: [PointsService],
  controllers: [PointsController],
})
export class PointsModule {}
