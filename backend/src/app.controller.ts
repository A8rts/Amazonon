import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './authentication/guards/login.guard';

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
}
