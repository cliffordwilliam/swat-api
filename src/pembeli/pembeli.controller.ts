import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PembeliService } from './pembeli.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('pembeli')
export class PembeliController {
  constructor(private readonly pembeliService: PembeliService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createPembeliDto: Prisma.PembeliCreateInput) {
    return this.pembeliService.create(createPembeliDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.pembeliService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pembeliService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePembeliDto: Prisma.PembeliUpdateInput,
  ) {
    return this.pembeliService.update(id, updatePembeliDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pembeliService.remove(id);
  }
}
