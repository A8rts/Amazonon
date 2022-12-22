import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { UsersModule } from '@users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@auth/local.strategy';
import { SessionSerializer } from '@auth/session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
