import { Attribute, BelongsTo, JsonApiModelConfig } from 'angular2-jsonapi';

import { BaseObject } from './_baseTitleObject';
import { Serviceline } from './serviceline';

@JsonApiModelConfig({ type: 'wsshours' })
export class Wsshour extends BaseObject {

  @BelongsTo()  serviceline: Serviceline;
  @Attribute()  date: Date;
  get strdatepicker() { return this.dPipe.transform(this.date, this.dFormatShortDatePicker); }
  @Attribute()  hours: number;
   // @HasMany()
  // comments: Comment[];
}
