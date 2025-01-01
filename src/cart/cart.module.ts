import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([CartItem]),
  ],
})
export class CartModule {}
