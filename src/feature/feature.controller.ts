import {
  Crud,
  CrudController,
  CrudRequest,
  ParsedRequest,
} from '@nestjsx/crud';
import { FeatureService } from './feature.service';
import { Feature } from './entities/feature.entity';
import { Controller, Param, UseGuards } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';

@ApiTags('feature') // Swagger tag
@Crud({
  model: {
    type: Feature,
  },
  query: {
    join: {
      products: {
        eager: false,
      },
    },
  },
  dto: {
    create: CreateFeatureDto,

    update: UpdateFeatureDto, // Specify DTO for create operation
  },
})
// @ApiBearerAuth()
// @Roles(RoleEnum.manager, RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('features')
export class FeatureController implements CrudController<Feature> {
  constructor(public service: FeatureService) {}
}
