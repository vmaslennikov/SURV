import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Errormessage } from '../../../shared/Models/errormessage';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class ErrormessageFormComponent extends BaseFormComponent<Errormessage> {
  getModel(): ModelType<Errormessage> { return Errormessage; }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Краткое описание', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'body', type: 'textarea',
        templateOptions: { label: 'Описание', placeholder: 'Введите значение', required: true, rows: 5 },
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }
  setValueForm(item) {
    this.itemform.setValue({
      title: this.item.title,
      body: this.item.body,
      active: this.item.active,
    });
  }
  updateValues(item) {
    item.title = this.itemform.value.title;
    item.body = this.itemform.value.body;
    item.active = this.itemform.value.active;
    return false;
  }
}
