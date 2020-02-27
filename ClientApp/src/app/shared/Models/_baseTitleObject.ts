import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo, JsonApiMetaModel } from 'angular2-jsonapi';
import { DatePipe } from '@angular/common';

@JsonApiModelConfig({ type: '' })
export class BaseObject extends JsonApiModel {
  @Attribute()  active: boolean;
  @Attribute()  createdAt: Date;
  @Attribute()  modifiedAt: Date;
  @Attribute()  createdbyid: string;
  @Attribute()  modifiedbyid: string;

  get strcreatedAt() {
    return this.dPipe.transform(this.createdAt, this.dFormat);
  }
  get strmodifiedAt() {
    return this.dPipe.transform(this.modifiedAt, this.dFormat);
  }
  get strActive() {
    return this.getBooleanText(this.active);
  }

  getBooleanText(v: boolean): string {
    return v ? 'Да' : 'Нет';
  }
  getdatepicker(v: Date) {
    return this.dPipe.transform(v, this.dFormatShortDatePicker);
  }
  // @HasMany()
  // comments: Comment[];
  // utils
  dPipe: DatePipe = new DatePipe('en-US');
  dFormat: string = 'dd.MM.yyyy HH:mm';
  dFormatShort: string = 'dd.MM.yyyy';
  dFormatShortDatePicker: string = 'yyyy-MM-dd';
}

@JsonApiModelConfig({ type: '' })
export class BaseTitleObject extends BaseObject {
  @Attribute()
  title: string;
  // @HasMany()
  // comments: Comment[];
}


