import { Test, TestingModule } from '@nestjs/testing';
import { PlantPositionsService } from './plant-positions.service';

describe('PlantPositionsService', () => {
  let service: PlantPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantPositionsService],
    }).compile();

    service = module.get<PlantPositionsService>(PlantPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
