import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { MedicalFormsEntity } from '../medical-forms.entity';
import { ApiProperty } from '@nestjs/swagger';
import { StringField } from '../../../decorators';

export interface IMedicalFormsDtoOptions {}

export class MedicalFormsDto extends AbstractDto {
  constructor(
    entityName: MedicalFormsEntity,
    options?: IMedicalFormsDtoOptions,
  ) {
    super(entityName);
    this.name = entityName.name;
    this.lastName = entityName.lastName;
    this.surName = entityName.surName;
    this.age = entityName.age;
    this.phoneNumber = entityName.phoneNumber;
    this.description = entityName.description;
    this.urlFail = entityName.urlFail;
    this.registerDate = entityName.registerDate;
  }

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
