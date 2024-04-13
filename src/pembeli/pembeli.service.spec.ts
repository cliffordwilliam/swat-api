import { Test, TestingModule } from '@nestjs/testing';
import { PembeliService } from './pembeli.service';

describe('PembeliService', () => {
  let service: PembeliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PembeliService],
    }).compile();

    service = module.get<PembeliService>(PembeliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
