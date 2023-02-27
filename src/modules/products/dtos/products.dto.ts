import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { ProductsEntity } from '../products.entity';
export interface IProductsDtoOptions {
  name?: string;
}
export class ProductsDto extends AbstractDto {
  constructor(entityName: ProductsEntity) {
    super(entityName);
  }

  @ApiPropertyOptional()
  discounted_price: string;

  @ApiPropertyOptional()
  dosages: string;

  @ApiPropertyOptional()
  featured_image: string;

  @ApiPropertyOptional()
  full_description: string;

  @ApiPropertyOptional()
  media: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  price: string;

  @ApiPropertyOptional()
  quantity: string;

  @ApiPropertyOptional()
  short_description: string;

  @ApiPropertyOptional()
  slug: string;
}
