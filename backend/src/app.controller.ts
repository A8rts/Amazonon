import { Controller, Get, Post, Req, UseGuards , Res , Next } from '@nestjs/common';
import { AppService } from '@/app.service';
import { AuthenticatedGuard } from '@guards/authenticated.guard';
import { LoginGuard } from '@guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Req() req) {
    return req.body;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/authorization') // for know user authicated or no
  authorization(@Req() req) {
    return req.user;
  }

  @Post('/logout')
  logOut(@Req() req, @Res() res, @Next() next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
}
