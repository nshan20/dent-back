import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateLabelHandler } from './commands/create-label.command';
import { LabelController } from './label.controller';
import { LabelEntity } from './label.entity';
import { LabelService } from './label.service';
import { GetLabelHandler } from './queries/get-label.query';

export const handlers = [CreateLabelHandler, GetLabelHandler];

@Module({
  imports: [TypeOrmModule.forFeature([LabelEntity])],
  providers: [LabelService, ...handlers],
  controllers: [LabelController],
})
export class LabelModule {}
