import { Test, TestingModule } from '@nestjs/testing';
import { PlantRelationsService } from './plant-relations.service';

describe('PlantRelationsService', () => {
  let service: PlantRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantRelationsService],
    }).compile();

    service = module.get<PlantRelationsService>(PlantRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
