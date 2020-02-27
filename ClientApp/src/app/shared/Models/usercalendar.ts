import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Client } from './client';
import { Person } from './person';

@JsonApiModelConfig({ type: 'usercalendars' })
export class Usercalendar extends BaseTitleObject {

  @BelongsTo()  client: Client;
  @BelongsTo()  person: Person;
  @Attribute()  dateFrom: Date;
  @Attribute()  dateTill: Date;
  @Attribute()  dayType: number;
  get strdateFrom() { return this.dPipe.transform(this.dateFrom, this.dFormatShort); }
  get strdateTill() { return this.dPipe.transform(this.dateTill, this.dFormatShort); }
  get strdatepickerFrom() { return this.dPipe.transform(this.dateFrom, this.dFormatShortDatePicker); }
  get strdatepickerTill() { return this.dPipe.transform(this.dateTill, this.dFormatShortDatePicker); }
  get strdayType() {
    switch (this.dayType) {
      case 0: return 'Командировка'; break;
      case 1: return 'Болезнь'; break;
      case 2: return 'Отпуск'; break;
      case 3: return 'Другое'; break;
      default: return 'Н/Д'; break;
    }
  }
  // @HasMany()
  // comments: Comment[];
}
