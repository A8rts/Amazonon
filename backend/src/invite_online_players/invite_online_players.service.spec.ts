import { Test, TestingModule } from '@nestjs/testing';
import { InviteOnlinePlayersService } from './invite_online_players.service';

describe('InviteOnlinePlayersService', () => {
  let service: InviteOnlinePlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteOnlinePlayersService],
    }).compile();

    service = module.get<InviteOnlinePlayersService>(InviteOnlinePlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
