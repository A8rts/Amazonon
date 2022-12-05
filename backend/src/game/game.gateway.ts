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
import { GameService } from './game.service';

@WebSocketGateway(8001, { cors: '*' })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    readonly questionsService: QuestionsService,
    readonly gameService: GameService,
  ) {}

  @WebSocketServer()
  server;

  users = []; // for handle users list

  afterInit() {
    console.log('afterInit');
  }

  handleConnection(client: Socket) {
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
  async handleStartsGames(client: any, messageData) {
    const question = await this.questionsService.findQuestion(
      messageData.gameSubjects,
    );
    const randLength = Math.floor(Math.random() * question.length);
    const rand_question = question[randLength][0]; // find question for show to players

    const game_time = this.gameService.createGameTime({
      game_key: messageData.game_key,
      creator: messageData.creator,
      question_id: rand_question.id,
      beads: [],
    });

    this.server.emit(
      `start${client.handshake.query['gameKey']}`,
      rand_question,
    );
  }
}
