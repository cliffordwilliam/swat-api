import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createItemDto: Prisma.ItemCreateInput) {
    return this.itemService.create(createItemDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: Prisma.ItemUpdateInput,
  ) {
    return this.itemService.update(id, updateItemDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
