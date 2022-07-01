import { Test, TestingModule } from '@nestjs/testing';
import { OrientationsService } from './orientations.service';

describe('OrientationsService', () => {
  let service: OrientationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrientationsService],
    }).compile();

    service = module.get<OrientationsService>(OrientationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
