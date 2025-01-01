import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Product } from '../product/entities/product.entity';
import { CouponEndUserController } from './coupon.endUser.controller';

@Module({
  controllers: [CouponEndUserController, CouponController],
  providers: [CouponService],
  imports: [TypeOrmModule.forFeature([Coupon, Product])],
  exports: [CouponService],
})
export class CouponModule {}
