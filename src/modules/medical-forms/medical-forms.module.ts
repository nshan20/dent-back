import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateMedicalFormsHandler } from './commands/create-medical-forms.command';
import { MedicalFormsController } from './medical-forms.controller';
import { MedicalFormsService } from './medical-forms.service';
import { GetMedicalFormsHandler } from './queries/get-medical-forms.query';
import { MedicalFormsEntity } from './medical-forms.entity';

export const handlers = [
CreateMedicalFormsHandler,
GetMedicalFormsHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalFormsEntity]),
  ],
  providers: [MedicalFormsService, ...handlers],
  controllers: [MedicalFormsController],
})
export class MedicalFormsModule {}
