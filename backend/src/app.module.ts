import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodeModule } from '@verification_code/verification_code.module';
import { VerificationCode } from '@verification_code/verification_code.entity';
import { User } from '@users/users.entity';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { GameModule } from '@/game/game.module';
import { Game } from '@/game/game.entity';
import { QuestionsModule } from '@/questions/questions.module';
import { Questions } from '@/questions/questions.entity';
import { GameTimes } from '@/game_times/game_times.entity';
import { Beads } from '@/beads/beads.entity';
import { Bettings } from '@/betting/bettings.entity';
import { PointsModule } from '@/points/points.module';
import { Points } from '@/points/points.entity';
import { GameTimesModule } from '@/game_times/game_times.module';
import { BettingModule } from '@/betting/betting.module';
import { BeadsModule } from '@/beads/beads.module';
import { AnswerTimesModule } from '@/answer_times/answer_times.module';
import { AnswerTimes } from '@/answer_times/answer_times.entity';
import { AnswersModule } from '@/answers/answers.module';
import { Answers } from '@/answers/answers.entity';
import { PlayAgainTimesModule } from '@play_again/play_again_times.module';
import { PlayAgainTimes } from '@play_again/play_again_times.entity';
import { WinnersModule } from './winners/winners.module';
import { Winners } from './winners/winners.entity';

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
        AnswerTimes,
        Answers,
        PlayAgainTimes,
        Winners
      ],
      synchronize: true,
    }),
    UsersModule,
    VerificationCodeModule,
    AuthModule,
    GameModule,
    QuestionsModule,
    PointsModule,
    GameTimesModule,
    BettingModule,
    BeadsModule,
    AnswerTimesModule,
    AnswersModule,
    PlayAgainTimesModule,
    WinnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
