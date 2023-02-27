import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import type { CategoryEntity } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import type { CreateCategoryDto } from '../dtos/create-category.dto';

export class CreateCategoryCommand implements ICommand {
  constructor(public readonly createCategoryDto: CreateCategoryDto) {}
}

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand, CategoryEntity>
{
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    const categoryEntity = this.categoryRepository.create();

    await this.categoryRepository.save(categoryEntity);

    return categoryEntity;
  }
}
