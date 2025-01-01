import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { CategoryService } from '../category/category.service';
import { UsersService } from '../users/users.service';
import { FeatureService } from '../feature/feature.service';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) repo,
    private categoryservice: CategoryService, // Inject  repository
    private usersService: UsersService, // Inject  repository
    private featuresService: FeatureService,
  ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: any): Promise<Product> {
    try {
      let product = new Product();
      product = { ...dto };
      console.log(product, 'productproduct');

      if (dto.categories && dto.categories.length > 0) {
        // Load categories based on provided IDs
        const categories = await this.categoryservice.find({
          where: { id: In(dto.categories) },
        });
        product.categories = categories;
      }
      if (dto.features && dto.features.length > 0) {
        // Load categories based on provided IDs
        const features = await this.featuresService.find({
          where: { id: In(dto.features) },
        });
        product.features = features;
      }
      const user = await this.usersService.findById(dto.userId);
      product.user = user;

      const res = await this.repo.save(product);

      const customMessage = 'Product Created successfully';

      return res;
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
