import { Test, TestingModule } from '@nestjs/testing';
import { BeadsService } from './beads.service';

describe('BeadsService', () => {
  let service: BeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeadsService],
    }).compile();

    service = module.get<BeadsService>(BeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
