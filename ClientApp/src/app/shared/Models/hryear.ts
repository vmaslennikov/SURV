import { JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';
import { Person } from './person';
import { BaseObject, BaseTitleObject } from './_baseTitleObject';

@JsonApiModelConfig({ type: 'hryears' })
export class Hryear extends BaseTitleObject {
  @Attribute() date: Date;
  @Attribute() approveDate: Date;
  @BelongsTo() approveperson: Person;
  get strdate() {
    return this.dPipe.transform(this.date, this.dFormatShort);
  }
  get strdatepicker() {
    return this.dPipe.transform(this.date, this.dFormatShortDatePicker);
  }
  get strapproveDate() {
    return this.dPipe.transform(this.approveDate, this.dFormat);
  }
}
