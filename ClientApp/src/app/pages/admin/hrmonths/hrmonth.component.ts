import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Hrmonth } from '../../../shared/Models/hrmonth';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Hryear } from 'src/app/shared/Models/hryear';

export class HrmonthFormComponent extends BaseFormComponent<Hrmonth> {
  getModel(): ModelType<Hrmonth> { return Hrmonth; }
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
        templateOptions: { label: 'Месяц (1 число необходимого месяца)', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }

  setValueForm(item: Hrmonth) {
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
