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
  ParsedBody,
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
@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('fav')
export class favEndUserController {
  constructor(public service: FavService) {}

  @UseGuards(OwnershipGuard)
  @Get('me/')
  @HttpCode(HttpStatus.OK)
  async getFavByUser(@Request() req: any): Promise<any> {
    const fav = await this.service.find({
      where: { user: { id: req?.user?.id } }, // Assuming 'user' is a relation in fav entity
      relations: ['favItems', 'favItems.product'], // Fetch related data
    });

    if (!fav) {
      throw new CustomNotFoundException(`fav not found for user `);
    }

    return fav;
  }

  @UseGuards(OwnershipGuard)
  @Patch('me/:id')
  @HttpCode(HttpStatus.OK)
  async UpdateFavByUser(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @Body() dto: UpdateFavDto,
  ): Promise<any> {
    console.log(dto, req, 'dto fav');

    const fav = await this.service.findOne({ where: { id: +id } });
    if (!fav) {
      throw new CustomNotFoundException(`fav not found for user `);
    }
    if (dto?.favItems && dto?.favItems?.length > 0) {
      fav.favItems = dto.favItems;
    } else if (dto?.favItems && dto?.favItems?.length == 0) {
      fav.favItems = [];
    }
    const res = await this.service.save(fav);

    return res;
  }
}
