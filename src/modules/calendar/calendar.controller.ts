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
import { CreateCalendarDto } from './dtos/create-calendar.dto';
import type { CalendarDto } from './dtos/calendar.dto';
import { CalendarPageOptionsDto } from './dtos/calendar-page-options.dto';
import { UpdateCalendarDto } from './dtos/update-calendar.dto';
import { CalendarService } from './calendar.service';

@Controller('calendars')
@ApiTags('calendars')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createCalendar(@Body() createCalendarDto: CreateCalendarDto) {
    const entity = await this.calendarService.createCalendar(createCalendarDto);

    return entity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllCalendar(
    @Query() calendarPageOptionsDto: CalendarPageOptionsDto,
  ): Promise<PageDto<CalendarDto>> {
    return this.calendarService.getAllCalendar(calendarPageOptionsDto);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleCalendar(@UUIDParam('id') id: Uuid): Promise<CalendarDto> {
    const entity = await this.calendarService.getSingleCalendar(id);

    return entity.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateCalendar(
    @UUIDParam('id') id: Uuid,
    @Body() updateCalendarDto: UpdateCalendarDto,
  ): Promise<void> {
    return this.calendarService.updateCalendar(id, updateCalendarDto);
  }

  @Delete(':id')
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCalendar(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.calendarService.deleteCalendar(id);
  }
}
