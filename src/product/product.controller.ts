import { BadRequestException, Body, Controller, Request } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products') // Swagger tag
@Crud({
  model: {
    type: Product,
  },
  dto: {
    create: CreateProductDto,
    update: UpdateProductDto,
  },
  query: {
    join: {
      categories: {
        eager: true,
      },
      features: {
        eager: true,
      },
    },
  },
})
@Controller('products')
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}
  get base(): CrudController<Product> {
    return this;
  }
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: CreateProductDto,
  ): Promise<Product> {
    // Here you can add custom validation logic
    if (!dto) {
      throw new BadRequestException('Please add the required fields');
    }

    // Call the base create method from CrudController
    return this.service.createOne(req, dto); // Or use this.base.createOneBase(req, dto);
  }
}
