import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userData: any) {
    const user = new User();
    user.username = userData.username;
    user.phonenumber = userData.phonenumber;
    user.gender = userData.gender;

    this.usersRepository.save(user);

    return true;
  }

  async verifyUser(userData: any) {
    if (userData.username.length > 13) {
      return 'longUserNameError';
    } else {
      const allUsers = await this.usersRepository.find();
      const phoneNumbers = [];

      for (let i = 0; i < allUsers.length; i++) {
        phoneNumbers.push(allUsers[i].phonenumber);
      }

      let duplicates = false;

      for (let j = 0; j < phoneNumbers.length; j++) {
        if (phoneNumbers[j] == userData.phonenumber) {
          duplicates = true;
        }
      }

      if (duplicates == true) {
        return 'duplicatesPhoneNumberError';
      } else {
        return 'successful';
      }
    }
  }

  async findOne(username: any): Promise<any> {
    const users = await this.usersRepository.find();
    return users.find((user) => user.username === username);
  }

  async findUserName(phonenumber: any) {
    const user = await this.usersRepository.findOneBy({ phonenumber });
    return user;
  }
}
