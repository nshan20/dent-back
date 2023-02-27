import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateCategoryHandler } from './commands/create-category.command';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { GetCategoryHandler } from './queries/get-category.query';

export const handlers = [
CreateCategoryHandler,
GetCategoryHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
  ],
  providers: [CategoryService, ...handlers],
  controllers: [CategoryController],
})
export class CategoryModule {}
