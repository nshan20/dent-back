import { Length } from 'class-validator';
import { Column, Entity } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IProductsDtoOptions } from './dtos/products.dto';
import { ProductsDto } from './dtos/products.dto';

export interface IProductsEntity extends IAbstractEntity<ProductsDto> {
  name: string;
  slug: string;
  featured_image: string;
  media: string;
  short_description: string;
  full_description: string;
  price: string;
  discounted_price: string;
  quantity: string;
  dosages: string;
}

@Entity({ name: 'products' })
@UseDto(ProductsDto)
export class ProductsEntity
  extends AbstractEntity<ProductsDto, IProductsDtoOptions>
  implements IProductsEntity
{
  @Length(10, 100)
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  discounted_price: string;

  @Column({ nullable: false })
  dosages: string;

  @Column({ nullable: false })
  featured_image: string;

  @Column({ nullable: false })
  @Length(144, 20_000)
  full_description: string;


  @Column({ nullable: false })
  media: string;

  @Column({ nullable: false })
  price: string;

  @Column({ nullable: false, type: 'int4' })
  quantity: string;

  @Column({ nullable: false })
  @Length(60, 144)
  short_description: string;
}
