import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CartItem } from '../entities/cart-item.entity';

export class CreateCartDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: '3',
    description: 'The user of the cart',
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    type: [CartItem],
    description: 'The orderItems of the cart',
    example: [
      {
        product: 3,
        quantity: 2,
      },
    ],
  })
  @IsNotEmpty()
  cartItems: CartItem[];
}
