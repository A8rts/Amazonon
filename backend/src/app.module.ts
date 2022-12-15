import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodeModule } from './authentication/verification_code/verification_code.module';
import { VerificationCode } from './authentication/verification_code/verification_code.entity';
import { User } from './authentication/users/users.entity';
import { UsersModule } from './authentication/users/users.module';
import { AuthModule } from './authentication/auth/auth.module';
import { GameModule } from './game/game.module';
import { Game } from './game/game.entity';
import { QuestionsModule } from './questions/questions.module';
import { Questions } from './questions/questions.entity';
import { GameTimes } from './game/game_times.entity';
import { Beads } from './game/beads.entity';
import { Bettings } from './game/bettings.entity';
import { PointsModule } from './points/points.module';
import { Points } from './points/points.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'amazonon',
      entities: [
        User,
        VerificationCode,
        Game,
        Questions,
        GameTimes,
        Beads,
        Bettings,
        Points,
      ],
      synchronize: true,
    }),
    UsersModule,
    VerificationCodeModule,
    AuthModule,
    GameModule,
    QuestionsModule,
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
