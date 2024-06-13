import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

export class GetMedicalFormsQuery implements ICommand {
  constructor(public readonly userId: Uuid,) {}
}

@QueryHandler(GetMedicalFormsQuery)
export class GetMedicalFormsHandler implements IQueryHandler<GetMedicalFormsQuery> {
  async execute(query: GetMedicalFormsQuery) {
    return [];
  }
}
