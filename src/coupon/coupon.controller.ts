import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { RoleEnum } from '../roles/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { ManagerGuard } from '../roles/managerGuard.guard';

@ApiTags('coupon') // Swagger tag
@Crud({
  model: {
    type: Coupon,
  },

  query: {
    join: {
      products: {
        eager: true,
      },
    },
  },
  dto: {
    create: CreateCouponDto,
    update: UpdateCouponDto,
  },
})
@ApiBearerAuth()
@Roles(RoleEnum.manager, RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('coupon')
export class CouponController implements CrudController<Coupon> {
  constructor(public service: CouponService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: CreateCouponDto,
  ): Promise<Coupon> {
    if (!dto) {
      throw new BadRequestException('Please add the required fields');
    }

    return this.service.createOne(req, dto);
  }
}
