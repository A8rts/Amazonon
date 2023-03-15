import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from './users.service';

@WebSocketGateway(8002, { cors: '*' })
export class UsersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(readonly usersService: UsersService) {}

  @WebSocketServer()
  server;

  afterInit() {}

  handleConnection(client: Socket) {
    const name = client.handshake.query['username'];
    this.usersService.setOnlineOffline(name, true); // set user to online
  }

  handleDisconnect(client: Socket) {
    const name = client.handshake.query['username'];
    this.usersService.setOnlineOffline(name, false); // set user to offline
  }
}
