import { Order } from '../../constants';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '../../decorators';

export class PageOptionsDto {
  @EnumFieldOptional(() => Order, {
    default: Order.ASC,
  })
  readonly order: Order = Order.ASC;

  @NumberFieldOptional({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringFieldOptional()
  readonly q?: string;

  @StringFieldOptional()
  readonly name?: string;

  @StringFieldOptional()
  readonly lastName?: string;

  @StringFieldOptional()
  readonly surName?: string;

  @StringFieldOptional()
  readonly age?: string;

  @StringFieldOptional()
  readonly phoneNumber?: string;

  @StringFieldOptional()
  readonly dayDate?: any;
}
