import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { Order } from './entities/order.entity';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { WalletService } from '../wallet/wallet.service';

@ApiTags('order') // Swagger tag
@Crud({
  model: {
    type: Order,
  },

  query: {
    join: {
      orderItems: {
        eager: true,
      },
      'orderItems.product': {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
  },
  dto: {
    create: CreateOrderDto,

    update: UpdateOrderDto, // Specify DTO for create operation
  },
})
@Controller('order')
export class OrderController implements CrudController<Order> {
  constructor(
    public service: OrderService,
    private readonly walletService: WalletService,
  ) {}

  get base(): CrudController<Order> {
    return this;
  }

  @ApiBody({
    description: 'Data for making an order with a coupon code and order items',
    type: CreateOrderDto,
  })
  @Post('order-user')
  async placeOrder(@Body() body: CreateOrderDto) {
    await this.walletService.handleOrder(body);
    return { message: 'Order placed and points added to wallet!' };
  }
}
