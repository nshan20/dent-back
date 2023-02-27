import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductsHandler } from './commands/create-products.command';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { GetProductsHandler } from './queries/get-products.query';

export const handlers = [
CreateProductsHandler,
GetProductsHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
  ],
  providers: [ProductsService, ...handlers],
  controllers: [ProductsController],
})
export class ProductsModule {}
