import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  users = []; // for handle users list

  afterInit() {
    console.log('afterInit');
  }

  handleConnection(client: Socket) {
    this.users.push({
      username: client.handshake.query['username'],
      gameKey: client.handshake.query['gameKey'],
    });

    const newUsers = this.users.filter(
      (user) => user.gameKey == client.handshake.query['gameKey'],
    ); // to send users that are in the same game in terms of keys

    this.server.emit(`${client.handshake.query['gameKey']}`, newUsers);
  }

  handleDisconnect(client: any) {
    // for when user left the game we remove that from users list
    const newUsers = this.users.filter(
      (user) => user.username !== client.handshake.query['username'],
    );
    this.users = newUsers;
    this.server.emit(`${client.handshake.query['gameKey']}`, this.users);
  }
}
