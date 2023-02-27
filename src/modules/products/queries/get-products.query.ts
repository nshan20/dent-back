import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { ProductsRepository } from '../products.repository';

export class GetProductsQuery implements ICommand {
  constructor(
    public readonly userId: Uuid,
  ) {}
}

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(query: GetProductsQuery) {
    return [];
    // return this.productsRepository.find({
    //   userId: query.userId,
    // });
  }
}
