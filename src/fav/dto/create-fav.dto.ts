import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FavItem } from '../entities/fav-item.entity';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class CreateFavDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: '3',
    description: 'The user of the Fav',
  })
  @IsString()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty({
    type: [FavItem],
    description: 'The orderItems of the Fav',
    example: [
      {
        product: 3,
        quantity: 2,
      },
    ],
  })
  @IsNotEmpty()
  favItems: FavItem[];
}
