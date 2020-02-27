import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Unit } from '../../../shared/Models/unit';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Company } from '../../../shared/Models/company';
import { Person } from '../../../shared/Models/person';

export class UnitFormComponent extends BaseFormComponent<Unit> {
  getModel(): ModelType<Unit> { return Unit; }
  getQueryParams(): any {
    return {
      include: 'company,manager',
    };
  }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
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
            className: 'col-md-6',
            key: 'manager', type: 'select',
            templateOptions: {
              label: 'Менеджер',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getPersons(),
            },
          },
        ],
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      }
    ];
  }

  setValueForm(item: Unit) {
    this.itemform.setValue({
      company: this.item.company ? this.item.company.id : null,
      manager: this.item.manager ? this.item.manager.id : null,
      title: this.item.title,
      active: this.item.active,
    });
  }

  updateValues(item: Unit) {
    item.title = this.itemform.value.title;
    item.active = this.itemform.value.active;

    //relationships
    item.company = this.datastore.peekRecord(Company, this.itemform.value.company);
    item.manager = this.datastore.peekRecord(Person, this.itemform.value.manager);
    return false;
  }
}
