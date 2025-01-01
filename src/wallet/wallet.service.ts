import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CouponService } from '../coupon/coupon.service';
import { OrderItem } from '../order/entities/order-item.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private couponService: CouponService,
  ) {}

  async addPoints(userId: number, points: number): Promise<Wallet> {
    var wallet = await this.walletRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'], // Ensures the related user entity is loaded if needed
    });

    if (!wallet) {
      wallet = await this.walletRepo.create({
        user: { id: userId },
        balance: 0,
      });

      // throw new Error('Wallet not found');
    }

    wallet.balance = +wallet.balance + points;
    // console.log(wallet, 'walletttt');

    await this.walletRepo.save(wallet);

    const transaction = this.transactionRepo.create({
      type: 'CREDIT',
      amount: points,
      timestamp: new Date(),
      user: { id: userId },
    });
    await this.transactionRepo.save(transaction);

    return wallet;
  }

  async handleOrder(dto: CreateOrderDto): Promise<void> {
    // Save the order
    const totalPrice = await this.calculateTotalPriceWithCoupons(
      dto.orderItems,
    );

    const order = this.orderRepo.create({ ...dto, amount: totalPrice });
    await this.orderRepo.save(order);

    // Calculate points and add to wallet
    const pointsToAdd = this.calculatePoints(totalPrice);
    console.log(pointsToAdd, 'pointsToAddpointsToAdd');

    await this.addPoints(+dto.user, pointsToAdd);
  }

  calculatePoints(amount: number): number {
    // For example, 1 point for every $10 spent
    return Math.floor(amount / 10);
  }

  async calculateTotalPriceWithCoupons(orderItems: any[]): Promise<number> {
    let totalPrice = 0;

    for (const item of orderItems) {
      const { product, quantity, coupon } = item;
      console.log(product, 'productsss');

      // Get the product price
      let price = product.price_per_night;

      // Apply coupon if a code is provided
      if (coupon) {
        const couponResult = await this.couponService.applyCoupon(
          coupon,
          product,
        );
        price = couponResult.price; // Use the discounted price
      }

      // Add to total price
      totalPrice += price * quantity;
    }

    return totalPrice;
  }
}
