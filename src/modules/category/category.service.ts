import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import type { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryCommand } from './commands/create-category.command';
import type { CategoryDto } from './dtos/category.dto';
import type { CategoryPageOptionsDto } from './dtos/category-page-options.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import type { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private validatorService: ValidatorService,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.commandBus.execute<CreateCategoryCommand, CategoryEntity>(
      new CreateCategoryCommand(createCategoryDto),
    );
  }

  async getAllCategory(
    categoryPageOptionsDto: CategoryPageOptionsDto,
  ): Promise<PageDto<CategoryDto>> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      categoryPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleCategory(id: string): Promise<CategoryEntity> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id });

    const categoryEntity = await queryBuilder.getOne();

    if (!categoryEntity) {
      throw new CategoryNotFoundException();
    }

    return categoryEntity;
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id });

    const categoryEntity = await queryBuilder.getOne();

    if (!categoryEntity) {
      throw new CategoryNotFoundException();
    }

    this.categoryRepository.merge(categoryEntity, updateCategoryDto);

    await this.categoryRepository.save(updateCategoryDto);
  }

  async deleteCategory(id: string): Promise<void> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id });

    const categoryEntity = await queryBuilder.getOne();

    if (!categoryEntity) {
      throw new CategoryNotFoundException();
    }

    await this.categoryRepository.remove(categoryEntity);
  }
}
