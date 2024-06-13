import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IMedicalFormsDtoOptions } from './dtos/medical-forms.dto';
import { MedicalFormsDto } from './dtos/medical-forms.dto';

@Entity({ name: 'medical-forms' })
@UseDto(MedicalFormsDto)
export class MedicalFormsEntity extends AbstractEntity<MedicalFormsDto,
  IMedicalFormsDtoOptions
> {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  surName: string;

  @Column()
  age: string;

  @Column()
  phoneNumber: string;

  @Column()
  description: string;

  @Column()
  urlFail: string;

  @Column()
  registerDate: string;
}
