import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.categoryNotFound', error);
  }
}
