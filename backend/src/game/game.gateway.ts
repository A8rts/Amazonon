import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { QuestionsService } from '@/questions/questions.service';
import { GameService } from '@/game/game.service';

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
  beads = [];

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

  @SubscribeMessage('kickPlayer') // kick player events
  async handleKickPlayer(client: any, username) {
    this.server.emit(`kick${username.username}`);
  }

  @SubscribeMessage('startGame') // for start games events
  async handleStartsGames(client: any, messageData) {
    const question = await this.questionsService.findQuestion(
      messageData.gameSubjects,
      client.handshake.query['gameKey'],
    );
    const randLength = Math.floor(Math.random() * question.length);
    const rand_question = question[randLength]; // find question for show to players

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

  @SubscribeMessage('beadSended')
  async handleBeadSended(client: any, bead: any) {
    this.beads.push({
      bead: bead.bead,
      gameKey: client.handshake.query['gameKey'],
    });

    this.server.emit(
      `saveBead${client.handshake.query['gameKey']}`,
      this.beads.filter(
        (bead) => bead.gameKey == client.handshake.query['gameKey'],
      ),
    );
  }

  @SubscribeMessage('clearBeads')
  async handleClearBeads(client: any) {
    this.beads = this.beads.filter(
      (bead: any) => bead.gameKey !== client.handshake.query['gameKey'],
    );
  }

  @SubscribeMessage('getBettingList')
  async handleGetBettingList(client: any, bet_list: any) {
    this.server.emit('showBettingList', bet_list.bet_list);
  }

  @SubscribeMessage('bettingDone')
  async handleBettingDone(client: any) {
    this.server.emit(
      `onePlayerBettingDone${client.handshake.query['gameKey']}`,
    );
  }

  @SubscribeMessage('bettingIsDone')
  async handleBettingIsDone(client: any) {
    this.server.emit(`bettingIsDone${client.handshake.query['gameKey']}`);
  }

  @SubscribeMessage('answetTimeFinished')
  async handleAnswetTimeFinished(client: any) {
    this.server.emit(`sendAnswers${client.handshake.query['gameKey']}`);
  }

  @SubscribeMessage('playAgain')
  async handlePlayAgain(client: any) {
    this.server.emit(`startAgain${client.handshake.query['gameKey']}`);
  }

  @SubscribeMessage('checkPoints')
  async handleCheckPoints(client: any) {
    this.server.emit(
      `getYourCoinAndCheckWinner${client.handshake.query['gameKey']}`,
    );
  }
}
