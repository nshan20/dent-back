import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators';
import { CreateCategoryDto } from './dtos/create-category.dto';
import type { CategoryDto } from './dtos/category.dto';
import { CategoryPageOptionsDto } from './dtos/category-page-options.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const entity = await this.categoryService.createCategory(createCategoryDto);

    return entity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllCategory(@Query() categoryPageOptionsDto: CategoryPageOptionsDto): Promise<PageDto<CategoryDto>> {
    return this.categoryService.getAllCategory(categoryPageOptionsDto);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleCategory(@UUIDParam('id') id: Uuid): Promise<CategoryDto> {
    const entity = await this.categoryService.getSingleCategory(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateCategory(
    @UUIDParam('id') id: Uuid,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCategory(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
