import { Test, TestingModule } from '@nestjs/testing';
import { BedLocationsService } from './bed-locations.service';

describe('BedLocationsService', () => {
  let service: BedLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedLocationsService],
    }).compile();

    service = module.get<BedLocationsService>(BedLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
