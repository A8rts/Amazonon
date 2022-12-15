import { Test, TestingModule } from '@nestjs/testing';
import { BeadsController } from './beads.controller';

describe('BeadsController', () => {
  let controller: BeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeadsController],
    }).compile();

    controller = module.get<BeadsController>(BeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
