import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodeModule } from './authentication/verification_code/verification_code.module';
import { VerificationCode } from './authentication/verification_code/verification_code.entity';
import { User } from './authentication/users/users.entity';
import { UsersModule } from './authentication/users/users.module';
import { AuthModule } from './authentication/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'amazonon',
      entities: [User, VerificationCode],
      synchronize: true,
    }),
    UsersModule,
    VerificationCodeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
