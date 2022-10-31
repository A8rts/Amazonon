import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from './verification_code.entity';
import { VerificationCodeService } from './verification_code.service';
import { VerificationCodeController } from './verification_code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationCode])],
  providers: [VerificationCodeService],
  exports: [VerificationCodeService],
  controllers: [VerificationCodeController],
})
export class VerificationCodeModule {}
