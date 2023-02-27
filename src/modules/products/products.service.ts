import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { CreateProductsCommand } from './commands/create-products.command';
import { CreateProductsDto } from './dtos/create-products.dto';
import type { ProductsDto } from './dtos/products.dto';
import type { ProductsPageOptionsDto } from './dtos/products-page-options.dto';
import type { UpdateProductsDto } from './dtos/update-products.dto';
import { ProductsNotFoundException } from './exceptions/products-not-found.exception';
import type { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private validatorService: ValidatorService,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createProducts(
    createProductsDto: CreateProductsDto,
  ): Promise<ProductsEntity> {
    return this.commandBus.execute<CreateProductsCommand, ProductsEntity>(
      new CreateProductsCommand(createProductsDto),
    );
  }

  async getAllProducts(
    productsPageOptionsDto: ProductsPageOptionsDto,
  ): Promise<PageDto<ProductsDto>> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.translations', 'productsTranslation');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      productsPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleProducts(id: Uuid): Promise<ProductsEntity> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .where('products.id = :id', { id });

    const productsEntity = await queryBuilder.getOne();

    if (!productsEntity) {
      throw new ProductsNotFoundException();
    }

    return productsEntity;
  }

  async updateProducts(
    id: Uuid,
    updateProductsDto: UpdateProductsDto,
  ): Promise<void> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .where('products.id = :id', { id });

    const productsEntity = await queryBuilder.getOne();

    if (!productsEntity) {
      throw new ProductsNotFoundException();
    }

    this.productsRepository.merge(productsEntity, updateProductsDto);

    await this.productsRepository.save(updateProductsDto);
  }

  async deleteProducts(id: Uuid): Promise<void> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('products')
      .where('products.id = :id', { id });

    const productsEntity = await queryBuilder.getOne();

    if (!productsEntity) {
      throw new ProductsNotFoundException();
    }

    await this.productsRepository.remove(productsEntity);
  }
}
