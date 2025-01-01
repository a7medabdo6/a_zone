import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '../../../../feature/entities/feature.entity';
import { CreateFeatureDto } from '../../../../feature/dto/create-feature.dto';

@Injectable()
export class FeatureSeedService {
  constructor(
    @InjectRepository(Feature)
    private repository: Repository<Feature>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      for (let i = 1; i <= 10; i++) {
        const featureDto = new CreateFeatureDto();
        featureDto.name_en = `Feature ${i} EN`;
        featureDto.name_ar = `Feature ${i} AR`;
        featureDto.icon = `icon-${i}`; // Example icon, you can adjust it

        // Create the Feature entity using the DTO
        const featureEntity = new Feature();
        featureEntity.name_en = featureDto.name_en;
        featureEntity.name_ar = featureDto.name_ar;
        featureEntity.icon = featureDto.icon;
        await this.repository.save(this.repository.create(featureDto));
      }
    }
  }
}
