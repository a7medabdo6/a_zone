import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { RoleEnum } from '../../roles/roles.enum';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'manager@manager.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @Transform(lowerCaseTransformer)
  usename: string;

  @ApiProperty()
  @IsNotEmpty()
  role: RoleDto;

  @ApiProperty()
  @IsNotEmpty()
  photo: FileDto;
}
