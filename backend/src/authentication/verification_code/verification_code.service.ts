import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationCode } from './verification_code.entity';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
  ) {}

  create(userData: any) {
    const verification_code = new VerificationCode();

    verification_code.code = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000,
    );
    verification_code.username = userData.username;
    verification_code.phonenumber = userData.phonenumber;
    verification_code.gender = userData.gender;
    verification_code.date = new Date();

    this.verificationCodeRepository.save(verification_code);

    return verification_code;
  }
}
