import { Test, TestingModule } from '@nestjs/testing';
import { PembeliController } from './pembeli.controller';
import { PembeliService } from './pembeli.service';

describe('PembeliController', () => {
  let controller: PembeliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PembeliController],
      providers: [PembeliService],
    }).compile();

    controller = module.get<PembeliController>(PembeliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
