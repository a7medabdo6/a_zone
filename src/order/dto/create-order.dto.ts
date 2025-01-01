import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class CreateOrderDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: ' status',
    description: 'The status of the Order',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: ' user',
    description: 'The user of the order',
  })
  @IsString()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty({
    type: [OrderItem],
    description: 'The orderItems of the Order',
    example: [
      {
        product: 3,
        quantity: 2,
        coupon: 'Trip2024',
      },
    ],
  })
  @IsNotEmpty()
  orderItems: OrderItem[];
}
