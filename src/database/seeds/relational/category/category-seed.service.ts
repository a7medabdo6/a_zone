import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../../category/entities/category.entity';
import { CreateCategoryDto } from '../../../../category/dto/create-category.dto';

@Injectable()
export class CategorySeedService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      // Generate 10 categories with random names
      for (let i = 1; i <= 10; i++) {
        const category = new CreateCategoryDto();
        category.name_en = `Category ${i} EN`;
        category.name_ar = `Category ${i} AR`;
        category.photo = null; // You can link an actual file path or URL if needed
        await this.repository.save(this.repository.create(category));
      }
    }
  }
}
