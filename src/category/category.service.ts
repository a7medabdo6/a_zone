import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

import { HttpException, HttpStatus } from '@nestjs/common';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  constructor(@InjectRepository(Category) repo) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: any): Promise<Category> {
    try {
      let category = new Category();
      category = { ...dto };

      const res = await this.repo.save(category);

      const customMessage = 'Product Created successfully';

      return res;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
