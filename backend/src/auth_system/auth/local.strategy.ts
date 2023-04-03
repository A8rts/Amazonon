import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'phonenumber',
    });
  }

  async validate(username: string, phonenumber: string) {
    const user = await this.authService.validateUser(username, phonenumber);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
