import { Controller, Post, Req } from '@nestjs/common';
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

  @Post('findUserName')
  findUserName(@Req() req) {
    return this.usersService.findUserName(req.body.phonenumber);
  }
}
