import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Coupon } from './entities/coupon.entity';
import { CrudRequest } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomNotFoundException } from '../errors/custom-not-found.exception';
import { Product } from '../product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService extends TypeOrmCrudService<Coupon> {
  constructor(
    @InjectRepository(Coupon) repo,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    super(repo);
  }
  async validateCoupon(code: string, productId: number): Promise<Coupon> {
    const coupon = await this.repo.findOne({
      where: { code },
      relations: ['products'],
    });

    if (!coupon) {
      throw new CustomNotFoundException('Coupon not found or inactive.');
    }
    console.log(coupon, 'new Date(coupon.expirationDate)');

    if (new Date() > new Date(coupon.expirationDate)) {
      throw new BadRequestException('Coupon has expired.');
    }

    const isApplicable = coupon.products.some(
      (product) => product.id === productId,
    );

    if (!isApplicable) {
      throw new CustomNotFoundException(
        'Coupon is not applicable to this product.',
      );
    }

    return coupon;
  }

  async applyCoupon(code: string, productId: number): Promise<any> {
    const coupon = await this.validateCoupon(code, productId);

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new CustomNotFoundException('Product not found.');
    }
    const discountedPrice =
      product.price_per_night -
      (product.price_per_night * coupon.discountPercentage) / 100;
    return { status: HttpStatus.OK, price: discountedPrice };
  }
}
