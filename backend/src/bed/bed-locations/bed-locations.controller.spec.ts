import { Test, TestingModule } from '@nestjs/testing';
import { BedLocationsController } from './bed-locations.controller';

describe('BedLocationsController', () => {
  let controller: BedLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedLocationsController],
    }).compile();

    controller = module.get<BedLocationsController>(BedLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
