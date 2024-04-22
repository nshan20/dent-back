import { StringField } from '../../../decorators';

export class CreateCalendarDto {
  @StringField()
  dayDate: string;

  @StringField()
  dayInfo: string;
}
