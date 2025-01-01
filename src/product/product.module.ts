import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { UsersModule } from '../users/users.module';
import { FeatureModule } from '../feature/feature.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    UsersModule,
    FeatureModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
