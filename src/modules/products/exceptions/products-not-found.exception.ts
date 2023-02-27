import { NotFoundException } from '@nestjs/common';

export class ProductsNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.productsNotFound', error);
  }
}
