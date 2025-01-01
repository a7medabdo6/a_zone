import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FileDto } from '../../files/dto/file.dto';

export class CreateCategoryDto {
  @IsOptional()
  id: number;

  @ApiProperty({
    example: ' name_en',
    description: 'The name_en of the Category',
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({
    example: ' name_ar',
    description: 'The name_ar of the Category',
  })
  @IsString()
  @IsNotEmpty()
  name_ar: string;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
