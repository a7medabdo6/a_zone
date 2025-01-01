import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { WalletService } from '../wallet/wallet.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([OrderItem]),

    TypeOrmModule.forFeature([Order]),
    WalletModule,
  ],
})
export class OrderModule {}
