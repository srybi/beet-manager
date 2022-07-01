import { Test, TestingModule } from '@nestjs/testing';
import { BedTypesController } from './bed-types.controller';

describe('BedTypesController', () => {
  let controller: BedTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedTypesController],
    }).compile();

    controller = module.get<BedTypesController>(BedTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
