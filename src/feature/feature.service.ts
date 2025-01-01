import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Feature } from './entities/feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class FeatureService extends TypeOrmCrudService<Feature> {
  constructor(
    @InjectRepository(Feature) repo,
    private readonly notificationsService: NotificationsService,
  ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: any): Promise<Feature> {
    try {
      let feature = new Feature();
      feature = { ...dto };
      const res = await this.repo.save(feature);
      this.notificationsService.sendNotification(`New user created:`);

      return res;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
