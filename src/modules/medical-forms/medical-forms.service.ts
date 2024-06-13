import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { CreateMedicalFormsCommand } from './commands/create-medical-forms.command';
import type { MedicalFormsDto } from './dtos/medical-forms.dto';
import type { MedicalFormsPageOptionsDto } from './dtos/medical-forms-page-options.dto';
import { MedicalFormsNotFoundException } from './exceptions/medical-forms-not-found.exception';
import { MedicalFormsEntity } from './medical-forms.entity';
import { CreateMedicalFormsDto } from './dtos/create-medical-forms.dto';
import type { UpdateMedicalFormsDto } from './dtos/update-medical-forms.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalFormsService {
  constructor(
    @InjectRepository(MedicalFormsEntity)
    private medicalFormsRepository: Repository<MedicalFormsEntity>,
    private validatorService: ValidatorService,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createMedicalForms(createMedicalFormsDto: CreateMedicalFormsDto): Promise<MedicalFormsEntity> {
    return this.commandBus.execute<CreateMedicalFormsCommand, MedicalFormsEntity>(
      new CreateMedicalFormsCommand(createMedicalFormsDto),
    );
  }

  async getAllMedicalForms(
    medicalFormsPageOptionsDto: MedicalFormsPageOptionsDto,
  ): Promise<PageDto<MedicalFormsDto>> {
    const queryBuilder = this.medicalFormsRepository
      .createQueryBuilder('medicalForms')
      .leftJoinAndSelect('medicalForms.translations', 'medicalFormsTranslation');
    const [items, pageMetaDto] = await queryBuilder.paginate(medicalFormsPageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getSingleMedicalForms(id: Uuid): Promise<MedicalFormsEntity> {
    const queryBuilder = this.medicalFormsRepository
      .createQueryBuilder('medicalForms')
      .where('medicalForms.id = :id', { id });

    const medicalFormsEntity = await queryBuilder.getOne();

    if (!medicalFormsEntity) {
      throw new MedicalFormsNotFoundException();
    }

    return medicalFormsEntity;
  }

  async updateMedicalForms(
    id: Uuid,
    updateMedicalFormsDto: UpdateMedicalFormsDto,
  ): Promise<void> {
    const queryBuilder = this.medicalFormsRepository
      .createQueryBuilder('medicalForms')
      .where('medicalForms.id = :id', { id });

    const medicalFormsEntity = await queryBuilder.getOne();

    if (!medicalFormsEntity) {
      throw new MedicalFormsNotFoundException();
    }

    this.medicalFormsRepository.merge(medicalFormsEntity, updateMedicalFormsDto);

    await this.medicalFormsRepository.save(updateMedicalFormsDto);
  }

  async deleteMedicalForms(id: Uuid): Promise<void> {
    const queryBuilder = this.medicalFormsRepository
      .createQueryBuilder('medicalForms')
      .where('medicalForms.id = :id', { id });

    const medicalFormsEntity = await queryBuilder.getOne();

    if (!medicalFormsEntity) {
      throw new MedicalFormsNotFoundException();
    }

    await this.medicalFormsRepository.remove(medicalFormsEntity);
  }
}
