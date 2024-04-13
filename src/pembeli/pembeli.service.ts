import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PembeliService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createPembeliDto: Prisma.PembeliCreateInput) {
    return this.databaseService.pembeli.create({
      data: createPembeliDto,
    });
  }

  async findAll() {
    return this.databaseService.pembeli.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.pembeli.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePembeliDto: Prisma.PembeliUpdateInput) {
    return this.databaseService.pembeli.update({
      where: {
        id,
      },
      data: updatePembeliDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.pembeli.delete({
      where: {
        id,
      },
    });
  }
}
