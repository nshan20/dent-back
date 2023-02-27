import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { ICategoryDtoOptions } from './dtos/category.dto';
import { CategoryDto } from './dtos/category.dto';
@Entity({ name: 'categories' })
@UseDto(CategoryDto)
export class CategoryEntity extends AbstractEntity<
  CategoryDto,
  ICategoryDtoOptions
> {
  @Column()
  name?: string;
}
