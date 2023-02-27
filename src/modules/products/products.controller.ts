import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators';
import { CreateProductsDto } from './dtos/create-products.dto';
import type { ProductsDto } from './dtos/products.dto';
import { ProductsPageOptionsDto } from './dtos/products-page-options.dto';
import { UpdateProductsDto } from './dtos/update-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProducts(@Body() createProductsDto: CreateProductsDto) {
    const entity = await this.productsService.createProducts(createProductsDto);

    return entity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllProducts(@Query() productsPageOptionsDto: ProductsPageOptionsDto): Promise<PageDto<ProductsDto>> {
    return this.productsService.getAllProducts(productsPageOptionsDto);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleProducts(@UUIDParam('id') id: Uuid): Promise<ProductsDto> {
    const entity = await this.productsService.getSingleProducts(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateProducts(
    @UUIDParam('id') id: Uuid,
    @Body() updateProductsDto: UpdateProductsDto,
  ): Promise<void> {
    return this.productsService.updateProducts(id, updateProductsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteProducts(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.productsService.deleteProducts(id);
  }
}
