```bash
npm i -g @nestjs/cli@latest
```

```bash
nest new ninja-api
```

```bash
npm run start:dev
```

browser <-> module (user, blogs) <-> controller <-> service

```bash
nest g module jenis
nest g controller jenis
nest g service jenis
```

or for all 3 at once

```bash
nest g resource jenis
```

Neon login, create proj

Pooled connection

Get Prisma env and connection string

Create prisma

```bash
npm i prisma -D
```

```bash
npx prisma init
```

Now you get env and the prisma schema

Copas neon env to this env

Copas the prisma to schema.prisma

Make your schema in schema.prisma

Then migrate (with/o saving the sql statement of the migration)

```bash
npx prisma migrate dev --name init
```

Now you have new migration log / see the date as the file name and the content as the sql command

Now you have prisma client

We will use this client API

If you change model, run generate

So edit the schema

Then run

```bash
npx prisma generate
npx prisma migrate dev --name name_change_or_whatever_name_for_this_new_migrate
```

To talk to db u rented, create controller and service for the db

```bash
nest g module database
```

```bash
nest g service database
```

Edit the db module

```ts
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
```

Edit the db service, await is here. So no need to await when you use method

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async OnModuleInit() {
    await this.$connect();
  }
}
```

Do not use dto / entities

Use the prisma instead

Go to a module and import the DatabaseModule

```ts
import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module'; // HERE

@Module({
  imports: [DatabaseModule], // HERE
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
```

Then edit the controller (Replace dto with prisma dto)

```ts
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
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
import { Prisma } from '@prisma/client'; // HERE

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  // create(@Body() createItemDto: CreateItemDto) {
  create(@Body() createItemDto: Prisma.ItemCreateInput) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  update(
    @Param('id') id: string,
    @Body() updateItemDto: Prisma.ItemUpdateInput,
  ) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
```

Finally edit the service, replace your dto with prisma dto

Also make all of the method async, no need to await since await is done in the db HERE

SEE ABOVE FOR THIS SEGMENT (Edit the db service, await is here. So no need to await when you use method)

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async OnModuleInit() {
    await this.$connect();
  }
}
```

Edit the service like this

```ts
import { Injectable } from '@nestjs/common';
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
import { Prisma } from '@prisma/client'; // HERE
import { DatabaseService } from 'src/database/database.service'; // HERE

@Injectable()
export class ItemService {
  constructor(private readonly databaseService: DatabaseService) {} // HERE
  // create(createItemDto: CreateItemDto) {
  async create(createItemDto: Prisma.ItemCreateInput) {
    // return 'This action adds a new item';
    return this.databaseService.item.create({
      data: createItemDto,
    });
  }

  // TODO: Add query, ask bi what is needed tomorrow
  // findAll(role?: 'INTERN' | 'ENGINEER') {
  async findAll() {
    // return `This action returns all item`;
    // if (role) return this.databaseService.item.findMany({
    //   where: {
    //     role,
    //   }
    // })
    // return `This action returns all order`;
    return this.databaseService.item.findMany();
  }

  async findOne(id: number) {
    // return `This action returns a #${id} item`;
    return this.databaseService.item.findUnique({
      where: {
        id,
      },
    });
  }

  // update(id: number, updateItemDto: UpdateItemDto) {
  async update(id: number, updateItemDto: Prisma.ItemUpdateInput) {
    // return `This action updates a #${id} item`;
    return this.databaseService.item.update({
      where: {
        id,
      },
      data: updateItemDto,
    });
  }

  async remove(id: number) {
    // return `This action removes a #${id} item`;
    return this.databaseService.item.delete({
      where: {
        id,
      },
    });
  }
}
```

Auth

Follow doc

https://docs.nestjs.com/security/authentication

Use my own module

But use my secret here

access_token: await this.jwtService.signAsync(payload),

Like this in auth service

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
```

<!-- Neon sql editor DELETE from "Pembeli" -->
