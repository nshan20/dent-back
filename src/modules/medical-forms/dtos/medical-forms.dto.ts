import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { MedicalFormsEntity } from '../medical-forms.entity';

export interface IMedicalFormsDtoOptions {
}

export class MedicalFormsDto extends AbstractDto {
  constructor(entityName: MedicalFormsEntity, options?: IMedicalFormsDtoOptions) {
    super(entityName);
  }
}
