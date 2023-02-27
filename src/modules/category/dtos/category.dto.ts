import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CategoryEntity } from '../category.entity';
import {ApiPropertyOptional} from "@nestjs/swagger";

export interface ICategoryDtoOptions {
  name?:string;
}

export class CategoryDto extends AbstractDto {
  @ApiPropertyOptional()
  name?: string;
  constructor(entityName: CategoryEntity) {
    super(entityName);
  }
}
