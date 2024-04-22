import { NotFoundException } from '@nestjs/common';

export class CalendarNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.calendarNotFound', error);
  }
}
