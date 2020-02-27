import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Client } from './client';
import { Person } from './person';
import { Company } from './company';

@JsonApiModelConfig({ type: 'projects' })
export class Project extends BaseTitleObject {

  @BelongsTo()  client: Client;
  @BelongsTo()  manager: Person;
  @BelongsTo()  company: Company;
  @Attribute()  block: boolean;
  get strblock() { return this.getBooleanText(this.block); }

  @Attribute()  dateFrom?: any;
  @Attribute()  dateTill?: any;

  get strdateFrom() {
    return this.dPipe.transform(this.dateFrom, this.dFormatShort);
  }
  get strdateTill() {
    return this.dPipe.transform(this.dateTill, this.dFormatShort);
  }
  get strdatepickerFrom() {
    return this.dPipe.transform(this.dateFrom, this.dFormatShortDatePicker);
  }
  get strdatepickerTill() {
    return this.dPipe.transform(this.dateTill, this.dFormatShortDatePicker);
  }

  // @HasMany()
  // comments: Comment[];
}
