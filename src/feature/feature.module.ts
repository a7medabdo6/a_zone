import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  controllers: [FeatureController],
  providers: [FeatureService],
  imports: [TypeOrmModule.forFeature([Feature]), NotificationsModule],
  exports: [FeatureService],
})
export class FeatureModule {}
