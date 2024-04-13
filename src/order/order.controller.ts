import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(
    @Body()
    createOrderDto: Prisma.OrderCreateInput & {
      itemIds: string[];
    },
  ) {
    const { itemIds, ...orderData } = createOrderDto;
    return this.orderService.create(orderData, itemIds);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateOrderDto: Prisma.OrderUpdateInput & {
      itemIds: string[];
    },
  ) {
    const { itemIds, ...updateData } = updateOrderDto;
    return this.orderService.update(id, updateData, itemIds);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
