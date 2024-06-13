import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { find } from 'lodash';

import type { CreateMedicalFormsDto } from '../dtos/create-medical-forms.dto';
import { MedicalFormsEntity } from '../medical-forms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CreateMedicalFormsCommand implements ICommand {
  constructor(
    public readonly createMedicalFormsDto: CreateMedicalFormsDto,
  ) {}
}

@CommandHandler(CreateMedicalFormsCommand)
export class CreateMedicalFormsHandler
  implements ICommandHandler<CreateMedicalFormsCommand, MedicalFormsEntity>
{
  constructor(
    @InjectRepository(MedicalFormsEntity)
    private medicalFormsRepository: Repository<MedicalFormsEntity>,
  ) {}

  async execute(command: CreateMedicalFormsCommand) {
    const { createMedicalFormsDto } = command;
    const medicalFormsEntity = this.medicalFormsRepository.create(createMedicalFormsDto);

    await this.medicalFormsRepository.save(medicalFormsEntity);

    return medicalFormsEntity;
  }
}
