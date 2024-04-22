import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { ICalendarDtoOptions } from './dtos/calendar.dto';
import { CalendarDto } from './dtos/calendar.dto';

@Entity({ name: 'calendars' })
@UseDto(CalendarDto)
export class CalendarEntity extends AbstractEntity<
  CalendarDto,
  ICalendarDtoOptions
> {
  @Column({ length: 100 })
  dayDate: string;

  @Column('text')
  dayInfo: string;
}
