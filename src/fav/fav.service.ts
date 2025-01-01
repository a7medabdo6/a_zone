import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Fav } from './entities/fav.entity';
import { Repository } from 'typeorm';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class FavService extends TypeOrmCrudService<Fav> {
  constructor(@InjectRepository(Fav) repo) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: any): Promise<Fav> {
    try {
      let category = new Fav();
      category = { ...dto };
      const res = await this.repo.save(category);
      return res;
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  save(entity) {
    this.repo.save(entity);
  }
}
