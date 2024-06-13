import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { CreateCalendarCommand } from './commands/create-calendar.command';
import type { CalendarDto } from './dtos/calendar.dto';
import type { CalendarPageOptionsDto } from './dtos/calendar-page-options.dto';
import { CalendarNotFoundException } from './exceptions/calendar-not-found.exception';
import { CalendarEntity } from './calendar.entity';
import { CreateCalendarDto } from './dtos/create-calendar.dto';
import type { UpdateCalendarDto } from './dtos/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEntity)
    private calendarRepository: Repository<CalendarEntity>,
    private validatorService: ValidatorService,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createCalendar(
    createCalendarDto: CreateCalendarDto,
  ): Promise<CalendarEntity> {
    return this.commandBus.execute<CreateCalendarCommand, CalendarEntity>(
      new CreateCalendarCommand(createCalendarDto),
    );
  }

  async getAllCalendar(
    calendarPageOptionsDto: CalendarPageOptionsDto,
  ): Promise<PageDto<CalendarDto>> {
    const queryBuilder = this.calendarRepository.createQueryBuilder('calendar');
      if(calendarPageOptionsDto.q){

        queryBuilder.andWhere({dayDate: Like(`%${calendarPageOptionsDto.q}%`)})
      }
    const [items, pageMetaDto] = await queryBuilder.paginate(
      calendarPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleCalendar(id: Uuid): Promise<CalendarEntity> {
    const queryBuilder = this.calendarRepository
      .createQueryBuilder('calendar')
      .where('calendar.id = :id', { id });

    const calendarEntity = await queryBuilder.getOne();

    if (!calendarEntity) {
      throw new CalendarNotFoundException();
    }

    return calendarEntity;
  }

  async updateCalendar(
    id: Uuid,
    updateCalendarDto: UpdateCalendarDto,
  ): Promise<void> {
    const queryBuilder = this.calendarRepository
      .createQueryBuilder('calendar')
      .where('calendar.id = :id', { id });

    const calendarEntity = await queryBuilder.getOne();

    if (!calendarEntity) {
      throw new CalendarNotFoundException();
    }

    const updatedDto = this.calendarRepository.merge(
      calendarEntity,
      updateCalendarDto,
    );

    await this.calendarRepository.save(updatedDto);
  }

  async deleteCalendar(id: Uuid): Promise<void> {
    const queryBuilder = this.calendarRepository
      .createQueryBuilder('calendar')
      .where('calendar.id = :id', { id });

    const calendarEntity = await queryBuilder.getOne();

    if (!calendarEntity) {
      throw new CalendarNotFoundException();
    }

    await this.calendarRepository.remove(calendarEntity);
  }
}
