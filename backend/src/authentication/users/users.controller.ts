import { Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from '@users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  getUser(@Req() req) {
    return this.usersService.verifyUser(req.body.userData);
  }

  @Post('/create')
  create(@Req() req) {
    return this.usersService.create(req.body.userData);
  }

  @Get('getAll')
  getAll() {
    return this.usersService.getAll();
  }

  @Post('findUserName')
  findUserName(@Req() req) {
    return this.usersService.findUserName(req.body.phonenumber);
  }

  @Post('getNumberOfWins')
  getNumberOfWins(@Req() req) {
    return this.usersService.getNumberOfWins(req.body.username);
  }
}
