import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { FileDto } from '../../files/dto/file.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Feature } from '../../feature/entities/feature.entity';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: 'name_en',
    description: 'The name_en of the Trip',
  })
  @IsString({ message: i18nValidationMessage('common.validation.name_en') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.name_en') })
  name_en: string;

  @ApiProperty({
    example: 'name_ar',
    description: 'The name_ar of the Trip',
  })
  @IsString({ message: i18nValidationMessage('common.validation.name_ar') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.name_ar') })
  name_ar: string;

  @ApiProperty({
    example: 'desc_ar',
    description: 'The desc_ar of the Trip',
  })
  @IsString({ message: i18nValidationMessage('common.validation.desc_ar') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.desc_ar') })
  desc_ar: string;

  @ApiProperty({
    example: 'desc_en',
    description: 'The desc_en of the Trip',
  })
  @IsString({ message: i18nValidationMessage('common.validation.desc_en') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.desc_en') })
  desc_en: string;

  @ApiProperty({
    example: 'working hours en',
    description: 'The working_hours_en of the Trip',
  })
  @IsOptional()
  working_hours_en: string;

  @ApiProperty({
    example: 'working hours ar',
    description: 'The working_hours_ar of the Trip',
  })
  @IsOptional()
  working_hours_ar: string;

  @ApiProperty({
    example: 'location_en',
    description: 'The location_en of the Trip',
  })
  @IsOptional()
  location_en: string;

  @ApiProperty({
    example: 'location_ar',
    description: 'The location_ar of the Trip',
  })
  @IsOptional()
  location_ar: string;

  @ApiProperty({
    example: 'map',
    description: 'The map of the Trip',
  })
  @IsOptional()
  map: string;

  @ApiProperty({
    example: 'policy_en',
    description: 'The policy_en of the Trip',
  })
  @IsOptional()
  policy_en: string;

  @ApiProperty({
    example: 'policy_ar',
    description: 'The policy_ar of the Trip',
  })
  @IsOptional()
  policy_ar: string;

  @ApiProperty({
    example: 'terms_en',
    description: 'The terms_en of the Trip',
  })
  @IsOptional()
  terms_en: string;

  @ApiProperty({
    example: 'terms_ar',
    description: 'The terms_ar of the Trip',
  })
  @IsOptional()
  terms_ar: string;

  @ApiProperty({
    example: 'cancellation_policy_en',
    description: 'The cancellation_policy_en of the Trip',
  })
  @IsOptional()
  cancellation_policy_en: string;

  @ApiProperty({
    example: 'cancellation_policy_ar',
    description: 'The cancellation_policy_ar of the Trip',
  })
  @IsOptional()
  cancellation_policy_ar: string;

  @ApiProperty({
    example: '200',
    description: 'The price of the Trip',
  })
  @IsString({
    message: i18nValidationMessage('common.validation.price_per_night'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('common.validation.price_per_night'),
  })
  price_per_night: string;

  @ApiProperty({
    example: '1',
    description: 'User ID of the Trip',
  })
  @IsNumber({}, { message: i18nValidationMessage('common.validation.userId') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.userId') })
  userId: number;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.photo') })
  photo: FileDto | null;

  @ApiProperty({
    example: [1],
    description: 'The categories of the Trip',
    type: [Number],
  })
  @IsArray({ message: i18nValidationMessage('common.validation.categories') })
  @IsNotEmpty({
    message: i18nValidationMessage('common.validation.categories'),
  })
  categories: Category[];

  @ApiProperty({
    example: [1, 2],
    description: 'The features of the Trip',
    type: [Number],
  })
  @IsArray({ message: i18nValidationMessage('common.validation.features') })
  @IsOptional()
  features: Feature[];
}
