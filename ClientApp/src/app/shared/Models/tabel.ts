import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Person } from './person';
import { Company } from './company';
import { Serviceline } from './serviceline';

@JsonApiModelConfig({ type: 'tabels' })
export class Tabel extends BaseTitleObject {
  @Attribute()  year: number;
  @Attribute()  month: number;
  @Attribute()  fill: boolean;
  @Attribute()  approve: boolean;
  @Attribute()  date: Date;
  @Attribute()  fillDate?: Date;
  @Attribute()  approveDate?: Date;

  @BelongsTo()  person: Person;
  @BelongsTo()  approver: Person;
  @BelongsTo()  company: Company;

  @HasMany()  services: Serviceline[];

  get strfill() { return this.getBooleanText(this.fill); }
  get strapprove() { return this.getBooleanText(this.approve); }
  get strfillDate() {
    return this.dPipe.transform(this.fillDate, this.dFormatShort);
  }
  get strapproveDate() {
    return this.dPipe.transform(this.approveDate, this.dFormatShort);
  }
  get strfillDatePicker() {
    return this.dPipe.transform(this.fillDate, this.dFormatShortDatePicker);
  }
  get strapproveDatePicker() {
    return this.dPipe.transform(this.approveDate, this.dFormatShortDatePicker);
  }
  // @HasMany()
  // comments: Comment[];
}
