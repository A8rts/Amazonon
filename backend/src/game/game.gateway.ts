import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { QuestionsService } from 'src/questions/questions.service';

@WebSocketGateway(8001, { cors: '*' })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(readonly questionsService: QuestionsService) {}

  @WebSocketServer()
  server;

  users = []; // for handle users list

  afterInit() {
    console.log('afterInit');
  }

  handleConnection(client: Socket) {
    // console.log(client.handshake.query['capacity']);
    const capacity = Number(client.handshake.query['capacity']);

    this.users.push({
      username: client.handshake.query['username'],
      gender: client.handshake.query['gender'],
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

  @SubscribeMessage('startGame') // for start games events
  async handleStartsGames(client: any, gameSubjects) {
    const question = await this.questionsService.findQuestion(gameSubjects);
    const randLength = Math.floor(Math.random() * question.length);
    const rand_question = question[randLength][0]; // find question for show to players

    this.server.emit(
      `start${client.handshake.query['gameKey']}`,
      rand_question,
    );
  }
}
