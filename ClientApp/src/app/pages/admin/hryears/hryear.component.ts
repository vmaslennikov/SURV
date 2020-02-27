import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Hryear } from '../../../shared/Models/hryear';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Usercalendar } from 'src/app/shared/Models/usercalendar';
import { Person } from 'src/app/shared/Models/person';
import { Client } from 'src/app/shared/Models/client';

export class HryearFormComponent extends BaseFormComponent<Hryear> {
  getModel(): ModelType<Hryear> { return Hryear; }
  getQueryParams(): any {
    return {};
  }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'date', type: 'datepicker',
        templateOptions: { label: 'Год (1 января необходимого года)', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }

  setValueForm(item: Hryear) {
    this.itemform.setValue({
      title: this.item.title,
      date: this.item.strdatepicker,
      active: this.item.active,
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.date = new Date(new Date(this.itemform.value.date).getFullYear(), 0, 1);
    item.active = this.itemform.value.active;

    // relationships
    // item.person = this.datastore.peekRecord(Person, this.itemform.value.person);
    // item.client = this.datastore.peekRecord(Client, this.itemform.value.client);
    return false;
  }
}
