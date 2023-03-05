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
    user.bio = `سلام من ${userData.username} هستم`;
    user.score = 0;
    user.level = 1;
    if (userData.username == 'آرتا' || userData.username == 'حمید') {
      user.type = 'admin';
    } else {
      user.type = 'player';
    }

    this.usersRepository.save(user);

    return true;
  }

  getAll() {
    return this.usersRepository.find();
  }

  async verifyUser(userData: any) {
    if (userData.username.length > 13) {
      return 'longUserNameError';
    } else {
      const allUsers = await this.usersRepository.find();

      const phoneNumbers = []; // save all phonenumbers
      const userNames = []; // save all usernames

      for (let i = 0; i < allUsers.length; i++) {
        phoneNumbers.push(allUsers[i].phonenumber);
      }
      for (let u = 0; u < allUsers.length; u++) {
        userNames.push(allUsers[u].username);
      }

      let duplicates_phonenumber = false;
      let duplicates_username = false;
      for (let j = 0; j < phoneNumbers.length; j++) {
        if (phoneNumbers[j] == userData.phonenumber) {
          duplicates_phonenumber = true;
        }
      }
      for (let n = 0; n < userNames.length; n++) {
        if (userNames[n] == userData.username) {
          duplicates_username = true;
        }
      }

      if (duplicates_phonenumber == true) {
        return 'duplicatesPhoneNumberError';
      } else if (duplicates_username == true) {
        return 'duplicatesUserNameError';
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

  getNumberOfWins(username: string) {
    return this.usersRepository.findOneBy({ username: username });
  }
}
