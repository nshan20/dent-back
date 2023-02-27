import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateLabelDto } from '../dtos/create-label.dto';
import { LabelEntity } from '../label.entity';
export class CreateLabelCommand implements ICommand {
  constructor(public readonly createLabelDto: CreateLabelDto) {}
}

@CommandHandler(CreateLabelCommand)
export class CreateLabelHandler
  implements ICommandHandler<CreateLabelCommand, LabelEntity>
{
  constructor(
    @InjectRepository(LabelEntity)
    private labelRepository: Repository<LabelEntity>,
  ) {}

  async execute(command: CreateLabelCommand) {
    const labelEntity = this.labelRepository.create({
      name: command.createLabelDto.name,
    });
    await this.labelRepository.save(labelEntity);

    return labelEntity;
  }
}
