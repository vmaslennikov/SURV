import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Alert } from '../../../shared/Models/alert';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class AlertFormComponent extends BaseFormComponent<Alert> {
  getModel(): ModelType<Alert> { return Alert; }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'code', type: 'input',
        templateOptions: { label: 'Код', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'body', type: 'textarea',
        templateOptions: { label: 'Тело оповещения', placeholder: 'Введите значение', required: true, rows: 5 },
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }
  setValueForm(item) {
    this.itemform.setValue({
      code: this.item.code,
      title: this.item.title,
      body: this.item.body,
      active: this.item.active,
    });
  }
  updateValues(item) {
    item.code = this.itemform.value.code;
    item.title = this.itemform.value.title;
    item.body = this.itemform.value.body;
    item.active = this.itemform.value.active;
    return false;
  }
}
