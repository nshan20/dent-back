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
import {ApiCreatedResponse, ApiExtension, ApiTags} from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators';
import { CreateLabelDto } from './dtos/create-label.dto';
import { LabelDto } from './dtos/label.dto';
import { LabelPageOptionsDto } from './dtos/label-page-options.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';
import { LabelService } from './label.service';

@Controller('labels')
@ApiTags('labels')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: LabelDto })
  async createLabel(@Body() createLabelDto: CreateLabelDto) {
    console.log(createLabelDto);
    const entity = await this.labelService.createLabel(createLabelDto);

    return entity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllLabel(
    @Query() labelPageOptionsDto: LabelPageOptionsDto,
  ): Promise<PageDto<LabelDto>> {
    return this.labelService.getAllLabel(labelPageOptionsDto);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleLabel(@UUIDParam('id') id: string): Promise<LabelDto> {
    const entity = await this.labelService.getSingleLabel(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateLabel(
    @UUIDParam('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ): Promise<void> {
    return this.labelService.updateLabel(id, updateLabelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteLabel(@UUIDParam('id') id: string): Promise<void> {
    await this.labelService.deleteLabel(id);
  }
}
