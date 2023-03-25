import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8003, { cors: '*' })
export class InviteOnlinePlayersGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sendInviteRequest')
  handleMessage(client: any, data: any) {
    this.server.emit(`getInviteRequest${data[1]}`, data[0]);
  }
}
