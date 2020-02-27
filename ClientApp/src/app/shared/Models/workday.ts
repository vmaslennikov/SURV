import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';

@JsonApiModelConfig({ type: 'workdays' })
export class Workday extends BaseTitleObject {

  @Attribute()  date: Date;
  @Attribute()  dayType: number;
  @Attribute()  comment: string;
  get strdate() {
    return this.dPipe.transform(this.date, this.dFormatShort);
  }
  get strdatepicker() {
    return this.dPipe.transform(this.date, this.dFormatShortDatePicker);
  }
  get strdayType() {
    switch (this.dayType) {
      case 0: return 'Рабочий день'; break;
      case 1: return 'Нерабочий день'; break;
      case 2: return 'Короткий день'; break;
      default: return 'Н/Д'; break;
    }
  }
  // @HasMany()
  // comments: Comment[];
}
