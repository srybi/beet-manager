import { Test, TestingModule } from '@nestjs/testing';
import { OrientationsController } from './orientations.controller';

describe('OrientationsController', () => {
  let controller: OrientationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrientationsController],
    }).compile();

    controller = module.get<OrientationsController>(OrientationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
