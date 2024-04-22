import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateCalendarHandler } from './commands/create-calendar.command';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { GetCalendarHandler } from './queries/get-calendar.query';
import { CalendarEntity } from './calendar.entity';

export const handlers = [CreateCalendarHandler, GetCalendarHandler];

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
  providers: [CalendarService, ...handlers],
  controllers: [CalendarController],
})
export class CalendarModule {}
