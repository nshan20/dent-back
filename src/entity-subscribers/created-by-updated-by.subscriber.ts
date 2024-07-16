import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AbstractEntity } from '../common/abstract.entity';
import { ContextProvider } from '../providers';

@EventSubscriber()
export class CreatedByUpdatedBySubscriber
  implements EntitySubscriberInterface<AbstractEntity>
{
  /**
   * Indicates that this subscriber only listens to AuditableEntity events.
   */
  listenTo() {
    return AbstractEntity;
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<AbstractEntity>) {
    const user = ContextProvider.getAuthUser();
    if (user) {
      event.entity.createdBy = user.id;
      event.entity.updatedBy = user.id;
    }
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<AbstractEntity>) {
    const user = ContextProvider.getAuthUser();
    if (user && event?.entity) {
      event.entity.updatedBy = user.id;
    }
  }
}
