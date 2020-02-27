import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Cost } from '../../../shared/Models/cost';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Grade } from '../../../shared/Models/grade';
import { Client } from '../../../shared/Models/client';

export class CostFormComponent extends BaseFormComponent<Cost> {
  getModel(): ModelType<Cost> { return Cost; }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'client', type: 'select',
        templateOptions: {
          label: 'Клиент',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          options: this.datasources.getClients(),
        },
      },
      {
        key: 'grade', type: 'select',
        templateOptions: {
          label: 'Грейд',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          options: this.datasources.getGrades(),
        },
      },
      {
        key: 'currency', type: 'select',
        templateOptions: {
          label: 'Валюта',
          required: true,
          options: [
            {label: 'Рубли', value: 'Рубли'},
            {label: 'Доллары США', value: 'Доллары США'},
            {label: 'Евро', value: 'Евро'},
          ]
        },
      },
      {
        key: 'sum', type: 'input',
        templateOptions: { label: 'Сумма' , type: 'number', min: 0},
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }

  getQueryParams(): any {
    return {
      include: 'client,grade',
    };
  }

  setValueForm(item) {
    this.itemform.setValue({
      title: this.item.title,
      client: this.item.client ? this.item.client.id : null,
      grade: this.item.grade ? this.item.grade.id : null,
      currency: this.item.currency,
      sum: this.item.sum,
      active: this.item.active,
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.currency = this.itemform.value.currency;
    item.sum = this.itemform.value.sum;
    item.active = this.itemform.value.active;
    //relationships
    item.grade = this.datastore.peekRecord(Grade, this.itemform.value.grade);
    item.client = this.datastore.peekRecord(Client, this.itemform.value.client);
    return false;
  }
}
