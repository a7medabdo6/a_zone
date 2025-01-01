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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { Cart } from './entities/cart.entity';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from '../roles/ownership.guard';
import { CustomNotFoundException } from '../errors/custom-not-found.exception';
import { ManagerGuard } from '../roles/managerGuard.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';

@ApiTags('cart') // Swagger tag
@Crud({
  model: {
    type: Cart,
  },

  query: {
    join: {
      cartItems: {
        eager: true,
      },
      'cartItems.product': {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
  },
  dto: {
    create: CreateCartDto,

    update: UpdateCartDto, // Specify DTO for create operation
  },
})
@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user, RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('cart')
export class CartController implements CrudController<Cart> {
  constructor(public service: CartService) {}

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: CreateCartDto,
  ): Promise<Cart> {
    if (!dto) {
      throw new BadRequestException('Please add the required fields');
    }

    return this.service.createOne(req, dto);
  }

  @Override()
  @UseGuards(ManagerGuard)
  async getMany(@ParsedRequest() req: CrudRequest): Promise<Cart[]> {
    return this.service.find({
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  @UseGuards(OwnershipGuard)
  @Get('me/')
  @HttpCode(HttpStatus.OK)
  async getCartByUser(@Request() req: any): Promise<any> {
    console.log(req?.user?.id, 'req?.user?.id');

    const cart = await this.service.find({
      where: { user: { id: req?.user?.id } }, // Assuming 'user' is a relation in Cart entity
      relations: ['cartItems', 'cartItems.product'], // Fetch related data
    });

    if (!cart) {
      throw new CustomNotFoundException(`Cart not found for user `);
    }

    return cart;
  }

  @Override()
  @UseGuards(ManagerGuard)
  async getOne(
    @ParsedRequest() req: CrudRequest,
    @Param('id') id: string,
  ): Promise<Cart | any> {
    return this.service.findOne({
      where: { id: +id },
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  // @Override()
  // @UseGuards(OwnershipGuard)
  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteOne(
  //   @Param('id') id: string,
  //   @ParsedRequest() req: CrudRequest,
  //   @Request() request: any,
  // ): Promise<any> {
  //   const cart = await this.service.findOne({
  //     where: { id: +id },
  //     relations: ['user'],
  //   });
  //   if (!cart) {
  //     throw new CustomNotFoundException(`Cart with id ${id} not found`);
  //   }
  //   const currentUserId = request.user.id;
  //   if (cart.user.id !== currentUserId) {
  //     throw new CustomNotFoundException(
  //       'You are not authorized to delete this cart',
  //     );
  //   }
  //   await this.service.deleteOne(req);
  // }
}
