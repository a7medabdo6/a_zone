import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../../../product/dto/create-product.dto';
import { Product } from '../../../../product/entities/product.entity';
import { Category } from '../../../../category/entities/category.entity';
import { Feature } from '../../../../feature/entities/feature.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const categories = await this.categoryRepository.find(); // Assume there are categories in DB
      const features = await this.featureRepository.find(); // Assume there are features in DB

      for (let i = 1; i <= 10; i++) {
        const productDto = new CreateProductDto();
        productDto.name_en = `Product ${i} EN`;
        productDto.name_ar = `Product ${i} AR`;
        productDto.desc_en = `Description for Product ${i} in English`;
        productDto.desc_ar = `Description for Product ${i} in Arabic`;
        productDto.price_per_night = '100'; // Example price
        productDto.categories = categories.slice(0, 3); // Assign the first 3 categories as an example
        productDto.features = features.slice(0, 2); // Assign the first 2 features as an example
        productDto.photo = null; // You can assign a photo URL or path if needed

        // Map DTO to Entity
        const productEntity = new Product();
        productEntity.name_en = productDto.name_en;
        productEntity.name_ar = productDto.name_ar;
        productEntity.desc_en = productDto.desc_en;
        productEntity.desc_ar = productDto.desc_ar;
        productEntity.price_per_night = +productDto.price_per_night;
        productEntity.categories = productDto.categories;
        productEntity.features = productDto.features;
        productEntity.photo = productDto.photo;

        await this.repository.save(this.repository.create(productEntity));
      }
    }
  }
}
