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
  ParseIntPipe,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { RoleEnum } from '../roles/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('coupon')
export class CouponEndUserController implements CrudController<Coupon> {
  constructor(public service: CouponService) {}

  @ApiOperation({ summary: 'Apply a coupon to a product' })
  @ApiParam({ name: 'productId', description: 'ID of the product' })
  @ApiBody({
    description: 'Data for applying a coupon',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string' },
      },
    },
  })
  @Post('apply/:productId')
  async applyCoupon(
    @Body('code') code: string,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.service.applyCoupon(code, productId);
  }
}
