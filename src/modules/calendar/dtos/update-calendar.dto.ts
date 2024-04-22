import { StringField } from '../../../decorators';

export class UpdateCalendarDto {
  @StringField()
  dayDate: string;

  @StringField()
  dayInfo: string;
}
