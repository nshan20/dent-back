import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { CreateLabelCommand } from './commands/create-label.command';
import { CreateLabelDto } from './dtos/create-label.dto';
import type { LabelDto } from './dtos/label.dto';
import type { LabelPageOptionsDto } from './dtos/label-page-options.dto';
import type { UpdateLabelDto } from './dtos/update-label.dto';
import { LabelNotFoundException } from './exceptions/label-not-found.exception';
import { LabelEntity } from './label.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(LabelEntity)
    private labelRepository: Repository<LabelEntity>,
    private validatorService: ValidatorService,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createLabel(createLabelDto: CreateLabelDto): Promise<LabelEntity> {
    return this.commandBus.execute<CreateLabelCommand, LabelEntity>(
      new CreateLabelCommand(createLabelDto),
    );
  }

  async getAllLabel(
    labelPageOptionsDto: LabelPageOptionsDto,
  ): Promise<PageDto<LabelDto>> {
    const queryBuilder = this.labelRepository.createQueryBuilder('label');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      labelPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleLabel(id: string): Promise<LabelEntity> {
    const queryBuilder = this.labelRepository
      .createQueryBuilder('label')
      .where('label.id = :id', { id });

    const labelEntity = await queryBuilder.getOne();

    if (!labelEntity) {
      throw new LabelNotFoundException();
    }

    return labelEntity;
  }

  async updateLabel(id: string, updateLabelDto: UpdateLabelDto): Promise<void> {
    const queryBuilder = this.labelRepository
      .createQueryBuilder('label')
      .where('label.id = :id', { id });

    const labelEntity = await queryBuilder.getOne();

    if (!labelEntity) {
      throw new LabelNotFoundException();
    }

    this.labelRepository.merge(labelEntity, updateLabelDto);

    await this.labelRepository.save(updateLabelDto);
  }

  async deleteLabel(id: string): Promise<void> {
    const queryBuilder = this.labelRepository
      .createQueryBuilder('label')
      .where('label.id = :id', { id });

    const labelEntity = await queryBuilder.getOne();

    if (!labelEntity) {
      throw new LabelNotFoundException();
    }

    await this.labelRepository.remove(labelEntity);
  }
}
