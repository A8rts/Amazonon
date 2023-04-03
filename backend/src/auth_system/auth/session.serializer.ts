import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: any, user: any) => void): any {
    done(null, user.username);
  }
  deserializeUser(username: any, done: (err: any, username: any) => void): any {
    const user = this.usersService.findOne(username);

    if (!user) {
      return done(`نمیتوان کاربر ${username} را پیدا کرد!`, null);
    }

    done(null, user);
  }
}
