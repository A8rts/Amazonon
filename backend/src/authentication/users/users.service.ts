import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/users.entity';
import { GameTimes } from '@/game_times/game_times.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(GameTimes)
    private gameTimesRepository: Repository<GameTimes>,
  ) {}

  create(userData: any) {
    const user = new User();
    user.username = userData.username;
    user.phonenumber = userData.phonenumber;
    user.gender = userData.gender;
    user.score = 0;
    user.level = 1;
    user.online = true;

    //length 1 is for cinema , length 2 is for food , 3 is for religious , 4 is for history, 5 is for nature and 6 is for sport :)
    user.correct_answers_for_categories = [0, 0, 0, 0, 0, 0];
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

  async updateCorrectAnswersForCategories(
    subject: string,
    list: any,
    gameKey: string,
  ) {
    // update the correct_answers_for_categories column
    let len = 0;
    subject == 'cinema'
      ? (len = 0)
      : subject == 'food'
      ? (len = 1)
      : subject == 'religious'
      ? (len = 2)
      : subject == 'history'
      ? (len = 3)
      : subject == 'nature'
      ? (len = 4)
      : subject == 'sport'
      ? (len = 5)
      : null;

    const gameTimes = await this.gameTimesRepository.findBy({
      game_key: gameKey,
    });
    const lastGameTime = gameTimes.slice(-1)[0];

    lastGameTime.updatedCorrectAnswersForCategories == false
      ? this.updateData(list, lastGameTime, len)
      : null;
  }

  async updateData(list: any, lastGameTime, len) {
    this.gameTimesRepository
      .createQueryBuilder()
      .update(GameTimes)
      .set({
        updatedCorrectAnswersForCategories: true,
      })
      .where('id = :id', { id: lastGameTime.id })
      .execute();

    for (let u = 0; u < list.length; u++) {
      const playerData = await this.usersRepository.findOneBy({
        username: list[u].username,
      });

      let new_correct_answers_for_categories =
        playerData.correct_answers_for_categories;

      const correct_answers: any = [];
      for (let l = 0; l < new_correct_answers_for_categories.length; l++) {
        correct_answers.push(
          parseInt(String(new_correct_answers_for_categories[l])),
        );
      }
      correct_answers[len] = correct_answers[len] + 1;

      this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({
          correct_answers_for_categories: correct_answers,
        })
        .where('username = :username', { username: list[u].username })
        .execute();
    }
  }

  setOnlineOffline(username: any, online: boolean) {
    online
      ? this.usersRepository
          .createQueryBuilder()
          .update(User)
          .set({ online: true })
          .where('username = :username', { username: username })
          .execute()
      : this.usersRepository
          .createQueryBuilder()
          .update(User)
          .set({ online: false })
          .where('username = :username', { username: username })
          .execute();
  }
}
