import { Test, TestingModule } from '@nestjs/testing';
import { InviteOnlinePlayersGateway } from './invite_online_players.gateway';

describe('InviteOnlinePlayersGateway', () => {
  let gateway: InviteOnlinePlayersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteOnlinePlayersGateway],
    }).compile();

    gateway = module.get<InviteOnlinePlayersGateway>(InviteOnlinePlayersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
