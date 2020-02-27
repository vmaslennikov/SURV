import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType, JsonApiQueryData } from 'angular2-jsonapi';
import { Client } from '../../../shared/Models/client';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Company } from '../../../shared/Models/company';

export class ClientFormComponent extends BaseFormComponent<Client> {
  getModel(): ModelType<Client> { return Client; }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true },
      },
      {
        key: 'company', type: 'select',
        templateOptions: {
          label: 'Компания',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          options: this.datasources.getCompanies(),
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'nonResident', type: 'checkbox',
            templateOptions: { label: 'Не резидент' },
          },
          {
            className: 'col-md-6',
            key: 'active', type: 'checkbox',
            templateOptions: { label: 'Запись активна' },
          },
        ]
      }

    ];
  }

  getQueryParams(): any {
    return {
      include: ['company'],
    };
  }

  setValueForm(item) {
    this.itemform.setValue({
      title: this.item.title,
      company: this.item.company ? this.item.company.id : null,
      nonResident: this.item.nonResident,
      active: this.item.active,
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.nonResident = this.itemform.value.nonResident;
    item.active = this.itemform.value.active;
    //relationships
    item.company = this.datastore.peekRecord(Company, this.itemform.value.company);
    return false;
  }
}
