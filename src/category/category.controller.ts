import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Category } from './entities/category.entity';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

@ApiTags('categories') // Swagger tag
@Crud({
  model: {
    type: Category,
  },
  query: {
    join: {
      products: {
        eager: false,
      },
    },
  },
  dto: {
    create: CreateCategoryDto,

    update: UpdateCategoryDto, // Specify DTO for create operation
  },
})
@ApiBearerAuth()
// @Roles(RoleEnum.admin, RoleEnum.manager)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('categories')
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}

  get base(): CrudController<Category> {
    return this;
  }

  @Override()
  async getOne(
    @ParsedRequest() req: CrudRequest,
    @Param('id') id: string,
  ): Promise<Category | any> {
    return this.service.findOne({
      where: { id: +id },
      relations: ['products'],
    });
  }
}
