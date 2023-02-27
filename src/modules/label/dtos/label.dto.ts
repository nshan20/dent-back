import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { LabelEntity } from '../label.entity';

export interface ILabelDtoOptions {
  name?: string;
}

export class LabelDto extends AbstractDto {
  @ApiPropertyOptional()
  name?: string;

  constructor(entityName: LabelEntity) {
    super(entityName);
  }
}
