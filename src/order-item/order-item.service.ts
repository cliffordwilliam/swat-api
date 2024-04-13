import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createOrderItemDto: Prisma.OrderItemCreateInput) {
    return this.databaseService.orderItem.create({
      data: createOrderItemDto,
    });
  }

  findAll() {
    return this.databaseService.orderItem.findMany();
  }

  findOne(id: string) {
    return this.databaseService.orderItem.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateOrderItemDto: Prisma.OrderItemUpdateInput) {
    return this.databaseService.item.update({
      where: {
        id,
      },
      data: updateOrderItemDto,
    });
  }

  remove(id: string) {
    return this.databaseService.orderItem.delete({
      where: {
        id,
      },
    });
  }
}
