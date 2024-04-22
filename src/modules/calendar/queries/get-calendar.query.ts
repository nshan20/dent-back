import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

export class GetCalendarQuery implements ICommand {
  constructor(public readonly userId: Uuid) {}
}

@QueryHandler(GetCalendarQuery)
export class GetCalendarHandler implements IQueryHandler<GetCalendarQuery> {
  async execute(query: GetCalendarQuery) {
    return [];
  }
}
