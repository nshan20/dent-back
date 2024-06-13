import { NotFoundException } from '@nestjs/common';

export class MedicalFormsNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.medicalFormsNotFound', error);
  }
}
