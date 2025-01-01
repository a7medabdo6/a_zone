import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Request,
} from '@nestjs/common';
import { FavService } from './fav.service';
import { CreateFavDto } from './dto/create-fav.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { Fav } from './entities/fav.entity';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from '../roles/ownership.guard';
import { CustomNotFoundException } from '../errors/custom-not-found.exception';
import { ManagerGuard } from '../roles/managerGuard.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFavDto } from './dto/update-fav.dto';

@ApiTags('fav') // Swagger tag
@Crud({
  model: {
    type: Fav,
  },

  query: {
    join: {
      favItems: {
        eager: true,
      },
      'favItems.product': {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
  },
  dto: {
    create: CreateFavDto,
    update: UpdateFavDto,
  },
})
@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('fav')
export class FavController implements CrudController<Fav> {
  constructor(public service: FavService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: CreateFavDto,
  ): Promise<Fav> {
    if (!dto) {
      throw new BadRequestException('Please add the required fields');
    }

    return this.service.createOne(req, dto);
  }

  @Override()
  @UseGuards(ManagerGuard)
  async getMany(@ParsedRequest() req: CrudRequest): Promise<Fav[]> {
    return this.service.find({
      relations: ['favItems', 'favItems.product'],
    });
  }

  @Override()
  @UseGuards(ManagerGuard)
  async getOne(
    @ParsedRequest() req: CrudRequest,
    @Param('id') id: string,
  ): Promise<Fav | any> {
    return this.service.findOne({
      where: { id: +id },
      relations: ['favItems', 'favItems.product'],
    });
  }
}
