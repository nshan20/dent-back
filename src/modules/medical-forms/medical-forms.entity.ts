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
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  surName: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  urlFail: string;

  @Column({ nullable: true })
  registerDate: string;
}
