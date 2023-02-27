import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { find } from 'lodash';

import type { CreateProductsDto } from '../dtos/create-products.dto';
import type { ProductsEntity } from '../products.entity';
import { ProductsRepository } from '../products.repository';

export class CreateProductsCommand implements ICommand {
  constructor(
    public readonly createProductsDto: CreateProductsDto,
  ) {}
}

@CommandHandler(CreateProductsCommand)
export class CreateProductsHandler
  implements ICommandHandler<CreateProductsCommand, ProductsEntity>
{
  constructor(
    private productsRepository: ProductsRepository
  ) {}

  async execute() {
    const productsEntity = this.productsRepository.create();
    await this.productsRepository.save(productsEntity);


    return productsEntity;
  }
}
