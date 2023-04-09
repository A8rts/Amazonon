import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Res,
  Next,
  Session,
} from '@nestjs/common';
import { AppService } from '@/app.service';
import { AuthenticatedGuard } from '@guards/authenticated.guard';
import { LoginGuard } from '@guards/login.guard';
import { Response } from 'express';
import { UsersService } from './auth_system/users/users.service';
const bcrypt = require('bcrypt');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  async login(
    @Session() session: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    //create the hashed user name for save it inti the ls_account cookie value
    const hashed_username = bcrypt.hashSync(session.passport.user, 10);
    // create the expire time(it is always next week date)
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    // get the id of user(with session username)
    const user_data = await this.usersService.getUserData(
      session.passport.user,
    );

    res.cookie('ls_account', hashed_username, { expires: new Date(nextWeek) }); // this cookie keeps the name of the last account you logged in
    res.cookie('is_authenticated', user_data.id, {
      expires: new Date(nextWeek),
    }); // this cookie keeps the id of user(it use for keep user logged in for one week)
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/authorization') // for know user authicated or no
  authorization(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/logout')
  logOut(@Req() req, @Res() res, @Next() next) {
    res.clearCookie('ls_account'); // clear all of the cookies
    res.clearCookie('is_authenticated');

    req.logout({ keepSessionInfo: false }, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }

  @Post('checkHashedData')
  checkHashedData(@Req() req) {
    const result = [];
    result.push(bcrypt.compareSync(req.body.username, req.body.hash));
    result.push(req.body.username);

    return result;
  }
}
