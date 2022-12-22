import { Controller, Post, Req } from '@nestjs/common';
import { VerificationCodeService } from '@verification_code/verification_code.service';

@Controller('verification-code')
export class VerificationCodeController {
  constructor(
    private readonly verficationCodeService: VerificationCodeService,
  ) {}

  @Post()
  create(@Req() req) {
    return this.verficationCodeService.create(req.body.userData);
  }
}
