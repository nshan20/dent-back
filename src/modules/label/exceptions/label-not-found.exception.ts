import { NotFoundException } from '@nestjs/common';

export class LabelNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.labelNotFound', error);
  }
}
