import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CalendarEntity } from '../calendar.entity';
import { ApiProperty } from '@nestjs/swagger';
import { StringField } from '../../../decorators';

export interface ICalendarDtoOptions {}

export class CalendarDto extends AbstractDto {
  constructor(entityName: CalendarEntity, options?: ICalendarDtoOptions) {
    super(entityName);
    this.dayDate = entityName.dayDate;
    this.dayInfo = entityName.dayInfo;
  }

  @ApiProperty()
  @StringField()
  dayInfo: string;

  @ApiProperty()
  @StringField()
  dayDate: string;
}
