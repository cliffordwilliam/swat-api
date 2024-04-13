import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createOrderDto: Prisma.OrderCreateInput, itemIds: string[]) {
    // Connect all items
    const orderItems = itemIds.map((itemId) => ({
      item: {
        connect: {
          id: itemId,
        },
      },
    }));

    // Compute the total totalPembelian (by accumulating the total harga from each item)
    const itemPrices = await this.databaseService.item.findMany({
      where: { id: { in: itemIds } },
    });
    const totalPembelian = itemIds.reduce((total, itemId) => {
      const item = itemPrices.find((item) => item.id === itemId);
      if (item) {
        return total + item.harga; // Accumulate the price for each item
      } else {
        return total; // Ignore items that are not found
      }
    }, 0);

    // Compute the grandtotal by adding the total with the ongkir
    let grandTotal = totalPembelian;
    grandTotal += createOrderDto.ongkir;

    // Edit the createOrderDto with that data
    const updatedCreateOrderDto = {
      ...createOrderDto,
      totalPembelian,
      grandTotal,
    };

    // Create with connected items
    return this.databaseService.order.create({
      data: {
        ...updatedCreateOrderDto,
        orderItems: {
          create: orderItems,
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.order.findMany({
      include: {
        pembeli: true,
        orderItems: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.order.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateOrderDto: Prisma.OrderUpdateInput,
    itemIds: string[],
  ) {
    // Find the existing order
    const existingOrder = await this.databaseService.order.findUnique({
      where: { id },
      include: { orderItems: true }, // Include associated items
    });

    // Throw error if order does not exist
    if (!existingOrder) {
      throw new Error(`Order with ID ${id} does not exist.`);
    }

    // Update order details
    const updatedOrder = await this.databaseService.order.update({
      where: { id },
      data: updateOrderDto,
    });

    // Disconnect previously connected items
    await this.databaseService.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    // Connect with new given data
    const orderItemsToCreate = itemIds.map((itemId) => ({
      orderId: id,
      itemId,
    }));
    await this.databaseService.orderItem.createMany({
      data: orderItemsToCreate,
    });

    // Compute the total totalPembelian (by accumulating the total harga from each item)
    const itemPrices = await this.databaseService.item.findMany({
      where: { id: { in: itemIds } },
    });
    const totalPembelian = itemIds.reduce((total, itemId) => {
      const item = itemPrices.find((item) => item.id === itemId);
      if (item) {
        return total + item.harga; // Accumulate the price for each item
      } else {
        return total; // Ignore items that are not found
      }
    }, 0);

    // Compute the grandtotal by adding the total with the ongkir, if it exists
    let grandTotal = totalPembelian;
    if (updateOrderDto.ongkir !== null && updateOrderDto.ongkir !== undefined) {
      grandTotal += updateOrderDto.ongkir as number;
    }

    // Update order with computed values
    await this.databaseService.order.update({
      where: { id },
      data: {
        totalPembelian,
        grandTotal,
      },
    });

    return updatedOrder;
  }

  async remove(id: string) {
    return this.databaseService.order.delete({
      where: {
        id,
      },
    });
  }
}
