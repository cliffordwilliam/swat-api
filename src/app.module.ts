import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { PembeliModule } from './pembeli/pembeli.module';
import { ItemModule } from './item/item.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [OrderModule, PembeliModule, ItemModule, DatabaseModule, AuthModule, UsersModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
