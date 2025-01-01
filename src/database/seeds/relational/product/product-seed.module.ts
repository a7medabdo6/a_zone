import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSeedService } from './product-seed.service';
import { Product } from '../../../../product/entities/product.entity';
import { Feature } from '../../../../feature/entities/feature.entity';
import { Category } from '../../../../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Feature, Category])],
  providers: [ProductSeedService],
  exports: [ProductSeedService],
})
export class ProductSeedModule {}
