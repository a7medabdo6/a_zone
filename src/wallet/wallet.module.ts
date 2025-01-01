import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { CouponModule } from '../coupon/coupon.module';
import { TransactionModule } from '../transaction/transaction.module';
import { Order } from '../order/entities/order.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    TypeOrmModule.forFeature([Wallet, Order, Transaction]),
    CouponModule,
    TransactionModule,
  ],
  exports: [WalletService],
})
export class WalletModule {}
