import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators';
import { CreateMedicalFormsDto } from './dtos/create-medical-forms.dto';
import type { MedicalFormsDto } from './dtos/medical-forms.dto';
import { MedicalFormsPageOptionsDto } from './dtos/medical-forms-page-options.dto';
import { UpdateMedicalFormsDto } from './dtos/update-medical-forms.dto';
import { MedicalFormsService } from './medical-forms.service';

@Controller('medical-forms')
@ApiTags('medical-forms')
export class MedicalFormsController {
  constructor(private medicalFormsService: MedicalFormsService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createMedicalForms(
    @Body() createMedicalFormsDto: CreateMedicalFormsDto,
  ) {
    const entity = await this.medicalFormsService.createMedicalForms(
      createMedicalFormsDto,
    );
    return entity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllMedicalForms(
    @Query() medicalFormsPageOptionsDto: MedicalFormsPageOptionsDto,
  ): Promise<PageDto<MedicalFormsDto>> {
    return this.medicalFormsService.getAllMedicalForms(
      medicalFormsPageOptionsDto,
    );
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleMedicalForms(
    @UUIDParam('id') id: Uuid,
  ): Promise<MedicalFormsDto> {
    const entity = await this.medicalFormsService.getSingleMedicalForms(id);

    return entity.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateMedicalForms(
    @UUIDParam('id') id: Uuid,
    @Body() updateMedicalFormsDto: UpdateMedicalFormsDto,
  ): Promise<void> {
    return this.medicalFormsService.updateMedicalForms(
      id,
      updateMedicalFormsDto,
    );
  }

  @Delete(':id')
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteMedicalForms(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.medicalFormsService.deleteMedicalForms(id);
  }
}
