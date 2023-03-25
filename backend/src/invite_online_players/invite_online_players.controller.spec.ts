import { Test, TestingModule } from '@nestjs/testing';
import { InviteOnlinePlayersController } from './invite_online_players.controller';

describe('InviteOnlinePlayersController', () => {
  let controller: InviteOnlinePlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InviteOnlinePlayersController],
    }).compile();

    controller = module.get<InviteOnlinePlayersController>(InviteOnlinePlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
