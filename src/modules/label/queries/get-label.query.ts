import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabelEntity } from '../label.entity';

export class GetLabelQuery implements ICommand {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetLabelQuery)
export class GetLabelHandler implements IQueryHandler<GetLabelQuery> {
  constructor(
    @InjectRepository(LabelEntity)
    private labelRepository: Repository<LabelEntity>,
  ) {}

  async execute(query: GetLabelQuery) {
    return this.labelRepository.findOne({});
  }
}
