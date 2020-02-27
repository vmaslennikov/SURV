import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Tabel } from '../../../shared/Models/tabel';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Person } from '../../../shared/Models/person';
import { Company } from '../../../shared/Models/company';

export class TabelFormComponent extends BaseFormComponent<Tabel> {
  getModel(): ModelType<Tabel> { return Tabel; }
  getQueryParams(): any {
    return {
      include: 'person,company,approver,services',
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
            className: 'col-md-3',
            key: 'person', type: 'select',
            templateOptions: {
              label: 'Сотрудник',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getPersons(),
            },
          },
          {
            className: 'col-md-3',
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
            className: 'col-md-3',
            key: 'year', type: 'input',
            templateOptions: {
              label: 'Год', type: 'number',
              required: true, min: 2000,
            },
          },
          {
            className: 'col-md-3',
            key: 'month', type: 'input',
            templateOptions: {
              label: 'Месяц', type: 'number',
              required: true, min: 1, max: 12,
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'fill', type: 'checkbox',
            templateOptions: { label: 'Заполнен' },
          },
          {
            className: 'col-md-3',
            key: 'approve', type: 'checkbox',
            templateOptions: { label: 'Согласован' },
          },
          {
            className: 'col-md-3',
            key: 'approver', type: 'select',
            templateOptions: {
              label: 'Согласующий',
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getPersons(),
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'fillDate', type: 'datepicker',
            templateOptions: { label: 'Дата заполнения', type: 'text'},
          },
          {
            className: 'col-md-3',
            key: 'approveDate', type: 'datepicker',
            templateOptions: { label: 'Дата согласования', type: 'text' },
          },
        ],
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }

  setValueForm(item: Tabel) {
    this.itemform.setValue({
      title: this.item.title,
      year: this.item.year,
      month: this.item.month,
      fill: this.item.fill || false,
      approve: this.item.approve || false,
      fillDate: this.item.fillDate || null,
      approveDate: this.item.approveDate || null,
      person: this.item.person ? this.item.person.id : null,
      approver: this.item.approver ? this.item.approver.id : null,
      company: this.item.company ? this.item.company.id : null,
      active: this.item.active,
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.year = this.itemform.value.year;
    item.month = this.itemform.value.month;
    item.fill = this.itemform.value.fill;
    item.approve = this.itemform.value.approve;
    item.date = item.year + '-' + item.month + '-01';
    item.fillDate = this.itemform.value.fill;
    item.approveDate = this.itemform.value.approve;
    item.active = this.itemform.value.active;

    item.person = this.datastore.peekRecord(Person, this.itemform.value.person);
    item.approver = this.datastore.peekRecord(Person, this.itemform.value.approver);
    item.company = this.datastore.peekRecord(Company, this.itemform.value.Company);
    return false;
  }
}
