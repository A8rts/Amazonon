import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationCode } from '@verification_code/verification_code.entity';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
  ) {}

  async create(userData: any) {
    let canContinue = await this.checkPrevVerificationCodeTime(
      userData.username,
    );
    if (canContinue == true) {
      const verification_code = new VerificationCode();

      verification_code.code = Math.floor(
        Math.random() * (99999 - 10000 + 1) + 10000,
      );
      verification_code.username = userData.username;
      verification_code.phonenumber = userData.phonenumber;
      verification_code.gender = userData.gender;
      verification_code.date = new Date();

      this.verificationCodeRepository.save(verification_code);

      return ['ok', verification_code];
    } else {
      return ['notOk', canContinue];
    }
  }

  async checkPrevVerificationCodeTime(username: string) {
    // to avoid requesting verification code after verification code
    const prevVerificationCodes = await this.verificationCodeRepository.findBy({
      username: username,
    });
    console.log(prevVerificationCodes);

    const lastLength = prevVerificationCodes.length - 1;
    if (prevVerificationCodes.length > 0) {
      const lastTime = prevVerificationCodes[lastLength].date;
      const nowTime = new Date();

      const diffTime = nowTime.getTime() - lastTime.getTime();
      const totalSeconds = parseInt(String(Math.floor(diffTime / 1000)));
      console.log(totalSeconds);

      if (totalSeconds < 30) {
        return totalSeconds;
      }
      return true;
    } else {
      return true;
    }
  }

  async deleteVerifyCode(code: number) {
    const verifyCodeId = await this.verificationCodeRepository.findOneBy({
      code: code,
    });

    return this.verificationCodeRepository.delete(verifyCodeId.id);
  }
}
