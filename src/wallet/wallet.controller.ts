import { Controller, Post, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateOrderDto } from '../order/dto/create-order.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('order')
  async placeOrder(@Body() body: CreateOrderDto) {
    await this.walletService.handleOrder(body);
    return { message: 'Order placed and points added to wallet!' };
  }
}
