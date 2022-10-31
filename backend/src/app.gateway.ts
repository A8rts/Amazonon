import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { VerificationCodeService } from './verification_code/verification_code.service';

@WebSocketGateway(8001, { cors: '*' })
export class AppGateway {
  constructor(
    private readonly verficationCodeService: VerificationCodeService,
  ) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('auth')
  handleMessage(username: string, userData: any, gender: string): void {
    if (userData[0].length > 13) {
      return this.server.emit('errors', 'اسم شما بیشتر 13 کاراکتر است');
    } else {
      const code = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
      userData.push(code);
      this.verficationCodeService.create(userData);
      return this.server.emit('code_sended', true, userData);
    }
  }
}
