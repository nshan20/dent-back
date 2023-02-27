import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { ILabelDtoOptions } from './dtos/label.dto';
import { LabelDto } from './dtos/label.dto';

@Entity({ name: 'labels' })
@UseDto(LabelDto)
export class LabelEntity extends AbstractEntity<LabelDto, ILabelDtoOptions> {
  @Column()
  name: string;
}
