import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Service } from '../../../shared/Models/service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Servicetype } from '../../../shared/Models/servicetype';
import { Unit } from '../../../shared/Models/unit';
import { Company } from '../../../shared/Models/company';

export class ServiceFormComponent extends BaseFormComponent<Service> {
  getModel(): ModelType<Service> { return Service; }
  getQueryParams(): any {
    return {
      include: 'company,servicetype,unit',
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
            key: 'unit', type: 'select',
            templateOptions: {
              label: 'Подразделение',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getUnits(),
            },
          },
        ],
      },
      {
        key: 'comment', type: 'textarea',
        templateOptions: { label: 'Комментарий', rows: 3 },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'servicetype', type: 'select',
            templateOptions: {
              label: 'Тип услуги',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getServicetypes(),
            },
          },
          {
            className: 'col-md-6',
            key: 'active', type: 'checkbox',
            templateOptions: { label: 'Запись активна' },
          },
        ],
      },
    ];
  }

  setValueForm(item: Service) {
    this.itemform.setValue({
      company: this.item.company ? this.item.company.id : null,
      unit: this.item.unit ? this.item.unit.id : null,
      servicetype: this.item.servicetype ? this.item.servicetype.id : null,
      title: this.item.title,
      comment: this.item.comment || '',
      active: this.item.active,
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.comment = this.itemform.value.comment;
    item.active = this.itemform.value.active;

    //relationships
    item.company = this.datastore.peekRecord(Company, this.itemform.value.company);
    item.unit = this.datastore.peekRecord(Unit, this.itemform.value.unit);
    item.servicetype = this.datastore.peekRecord(Servicetype, this.itemform.value.servicetype);
    return false;
  }
}
