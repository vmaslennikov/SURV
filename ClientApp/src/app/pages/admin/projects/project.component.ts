import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Project } from '../../../shared/Models/project';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Usercalendar } from '../../../shared/Models/usercalendar';
import { Person } from '../../../shared/Models/person';
import { Client } from '../../../shared/Models/client';
import { Company } from '../../../shared/Models/company';
import { addHours } from 'date-fns';

export class ProjectFormComponent extends BaseFormComponent<Project> {
  getModel(): ModelType<Project> {
    return Project;
  }
  getQueryParams(): any {
    return {
      include: 'client,company,manager'
    };
  }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title',
        type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true }
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'client',
            type: 'select',
            templateOptions: {
              label: 'Клиент',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getActiveClients()
            }
          },
          {
            className: 'col-md-6',
            key: 'company',
            type: 'select',
            templateOptions: {
              label: 'Компания',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getCompanies()
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'manager',
            type: 'select',
            templateOptions: {
              label: 'Менеджер',
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getActivePersons()
            }
          },
          {
            className: 'col-md-3',
            key: 'dateFrom',
            type: 'datepicker',
            templateOptions: { label: 'Дата с', type: 'text' }
          },
          {
            className: 'col-md-3',
            key: 'dateTill',
            type: 'datepicker',
            templateOptions: { label: 'Дата по', type: 'text' }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'block',
            type: 'checkbox',
            templateOptions: { label: 'Блок' }
          },
          {
            className: 'col-md-6',
            key: 'active',
            type: 'checkbox',
            templateOptions: { label: 'Запись активна' }
          }
        ]
      }
    ];
  }

  setValueForm(item: Project) {
    this.itemform.setValue({
      client: this.item.client ? this.item.client.id : null,
      company: this.item.company ? this.item.company.id : null,
      manager: this.item.manager ? this.item.manager.id : null,
      title: this.item.title,
      block: this.item.block,
      dateFrom: this.item.strdatepickerFrom === '1970-01-01' ? null : this.item.strdatepickerFrom,
      dateTill: this.item.strdatepickerTill === '1970-01-01' ? null : this.item.strdatepickerTill,
      active: this.item.active
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.dateFrom = this.itemform.value.dateFrom;
    if (item.strdatepickerFrom === '1970-01-01') {
      item.dateFrom = null;
    } else if (item.dateFrom) {
      item.dateFrom = addHours(item.dateFrom, 3);
    }
    item.dateTill = this.itemform.value.dateTill;
    if (item.strdatepickerTill === '1970-01-01') {
      item.dateTill = null;
    } else if (item.dateTill) {
      item.dateTill = addHours(item.dateTill, 3);
    }
    item.dayType = this.itemform.value.dayType;
    item.active = this.itemform.value.active;

    // relationships
    item.client = this.datastore.peekRecord(Client, this.itemform.value.client);
    item.company = this.datastore.peekRecord(Company, this.itemform.value.company);
    item.manager = this.datastore.peekRecord(Person, this.itemform.value.manager);
    return false;
  }
}
