import { Test, TestingModule } from '@nestjs/testing';
import { PlantPositionsController } from './plant-positions.controller';

describe('PlantPositionsController', () => {
  let controller: PlantPositionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantPositionsController],
    }).compile();

    controller = module.get<PlantPositionsController>(PlantPositionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
