import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { CategoryRepository } from '../category.repository';

export class GetCategoryQuery implements ICommand {
  constructor(
    public readonly userId: Uuid,
  ) {}
}

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    return this.categoryRepository.find();
  }
}
