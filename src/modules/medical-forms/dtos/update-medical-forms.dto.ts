import { ApiProperty } from '@nestjs/swagger';
import { StringField } from '../../../decorators';

export class UpdateMedicalFormsDto {
  @ApiProperty()
  @StringField()
  name: string;

  @ApiProperty()
  @StringField()
  lastName: string;

  @ApiProperty()
  @StringField()
  surName: string;

  @ApiProperty()
  @StringField()
  age: string;

  @ApiProperty()
  @StringField()
  phoneNumber: string;

  @ApiProperty()
  @StringField()
  description: string;

  @ApiProperty()
  @StringField()
  urlFail: string;

  @ApiProperty()
  @StringField()
  registerDate: string;
}
