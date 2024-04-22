import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import type { CreateCalendarDto } from '../dtos/create-calendar.dto';
import { CalendarEntity } from '../calendar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CreateCalendarCommand implements ICommand {
  constructor(public readonly createCalendarDto: CreateCalendarDto) {}
}

@CommandHandler(CreateCalendarCommand)
export class CreateCalendarHandler
  implements ICommandHandler<CreateCalendarCommand, CalendarEntity>
{
  constructor(
    @InjectRepository(CalendarEntity)
    private calendarRepository: Repository<CalendarEntity>,
  ) {}

  async execute(command: CreateCalendarCommand) {
    const { createCalendarDto } = command;
    const calendarEntity = this.calendarRepository.create(createCalendarDto);

    await this.calendarRepository.save(calendarEntity);

    return calendarEntity;
  }
}
