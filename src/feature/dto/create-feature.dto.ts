import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateFeatureDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: ' name_en',
    description: 'The name_en of the feature',
  })
  @IsString({ message: i18nValidationMessage('common.validation.name_en') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.name_en') })
  name_en: string;

  @ApiProperty({
    example: ' name_ar',
    description: 'The name_ar of the feature',
  })
  @IsString({ message: i18nValidationMessage('common.validation.name_ar') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.name_ar') })
  name_ar: string;

  @ApiProperty({
    example: ' icon',
    description: 'The icon of the feature',
  })
  @IsString({ message: i18nValidationMessage('common.validation.icon') })
  @IsNotEmpty({ message: i18nValidationMessage('common.validation.icon') })
  icon: string;
}
