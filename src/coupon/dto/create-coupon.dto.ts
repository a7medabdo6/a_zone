import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCouponDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: 'Trip2024',
    description: 'The code of the coupon',
  })
  @IsString({ message: i18nValidationMessage('common.validation.code') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.code') })
  code: string;

  @ApiProperty({
    example: 20,
    description: 'The discount Percentage of the coupon',
  })
  @IsString({
    message: i18nValidationMessage('common.validation.discountPercentage'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('common.validation.discountPercentage'),
  })
  discountPercentage: number;

  @ApiProperty({
    example: '2024-12-31T00:00:00.000Z',
    description: 'The expiration Date  of the coupon',
  })
  @IsString({
    message: i18nValidationMessage(
      'common.validation.expirationDate must be a Date instance',
    ),
  })
  expirationDate: Date;

  @ApiProperty({
    type: [Product],
    description: 'The Products of the Coupon',
    example: [{ id: 6 }],
  })
  @IsArray({
    message: i18nValidationMessage('common.validation.products'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('common.validation.products'),
  })
  products: Product[];
}
