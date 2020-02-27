import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModelType } from 'angular2-jsonapi';

import { Company } from '../../../shared/Models/company';
import { Grade } from '../../../shared/Models/grade';
import { Person } from '../../../shared/Models/person';
import { Role } from '../../../shared/Models/role';
import { Unit } from '../../../shared/Models/unit';
import { BaseFormComponent } from '../_generic/baseform.component';
import { addHours } from 'date-fns';
export class PersonFormComponent extends BaseFormComponent<Person> {
  getModel(): ModelType<Person> {
    return Person;
  }
  getQueryParams(): any {
    return {
      include: 'grade,manager,unit,companies,roles'
    };
  }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-9',
            key: 'fullName',
            type: 'input',
            templateOptions: { label: 'ФИО', placeholder: 'Введите значение', required: true }
          },
          {
            className: 'col-md-3',
            key: 'tabelNumber',
            type: 'input',
            templateOptions: { label: 'Номер', placeholder: 'Введите значение', required: true }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'userName',
            type: 'input',
            templateOptions: { label: 'Логин' }
          },
          {
            className: 'col-md-3',
            key: 'email',
            type: 'input',
            templateOptions: { label: 'Email', type: 'email' }
          },
          {
            className: 'col-md-3',
            key: 'dateFrom',
            type: 'datepicker',
            templateOptions: { label: 'Принят', type: 'text', required: true }
          },
          {
            className: 'col-md-3',
            key: 'dateTill',
            type: 'datepicker',
            templateOptions: { label: 'Снят', type: 'text' }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'manager',
            type: 'select',
            templateOptions: {
              label: 'Менеджер',
              // required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getActivePersons()
            }
          },
          {
            className: 'col-md-3',
            key: 'grade',
            type: 'select',
            templateOptions: {
              label: 'Грейд',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getGrades()
            }
          },
          {
            className: 'col-md-3',
            key: 'unit',
            type: 'select',
            templateOptions: {
              label: 'Подразделение',
              required: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getUnits()
            }
          },
          {
            className: 'col-md-3',
            key: 'workType',
            type: 'select',
            templateOptions: {
              label: 'Тип работы',
              required: true,
              options: [
                { label: 'Штатный сотрудник', value: 0 },
                { label: 'Совместитель', value: 1 }
              ]
            }
          },
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'roles',
            type: 'select',
            templateOptions: {
              label: 'Роли',
              multiple: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getRoles()
            }
          },
          {
            className: 'col-md-6',
            key: 'companies',
            type: 'select',
            templateOptions: {
              label: 'Компании',
              required: true,
              multiple: true,
              valueProp: 'id',
              labelProp: 'title',
              options: this.datasources.getCompanies()
            }
          }
        ]
      },
      {
        key: 'active',
        type: 'checkbox',
        templateOptions: { label: 'Запись активна' }
      }
    ];
  }

  setValueForm(item: Person) {
    const rArr = [];
    const cArr = [];
    if (item.roles) {
      item.roles.forEach((r, i) => {
        rArr.push(r.id);
      });
    }
    if (item.companies) {
      item.companies.forEach((c, i) => {
        cArr.push(c.id);
      });
    }
    this.itemform.setValue({
      grade: this.item.grade ? this.item.grade.id : null,
      unit: this.item.unit ? this.item.unit.id : null,
      manager: this.item.manager ? this.item.manager.id : null,
      companies: cArr.length > 0 ? cArr : null,
      roles: rArr.length > 0 ? rArr : null,
      tabelNumber: this.item.tabelNumber || '',
      fullName: this.item.fullName || '',
      userName: this.item.userName || '',
      email: this.item.email || '',
      workType: this.item.workType || 0,
      dateFrom: this.item.strdatepickerFrom === '1970-01-01' ? null : this.item.strdatepickerFrom,
      dateTill: this.item.strdatepickerTill === '1970-01-01' ? null : this.item.strdatepickerTill,
      active: this.item.active
    });
  }

  updateValues(item: Person) {
    item.tabelNumber = this.itemform.value.tabelNumber;
    item.fullName = this.itemform.value.fullName;
    item.userName = this.itemform.value.userName;
    item.email = this.itemform.value.email;
    item.workType = this.itemform.value.workType;

    item.dateFrom = addHours(this.itemform.value.dateFrom, 3);
    item.dateTill = this.itemform.value.dateTill;
    if (item.strdatepickerTill === '1970-01-01') {
      item.dateTill = null;
    } else if (item.dateTill) {
      item.dateTill = addHours(item.dateTill, 3);
    }
    item.active = this.itemform.value.active;

    // relationships
    item.unit = this.datastore.peekRecord(Unit, this.itemform.value.unit);
    item.grade = this.datastore.peekRecord(Grade, this.itemform.value.grade);
    item.manager = this.datastore.peekRecord(Person, this.itemform.value.manager);

    if (this.item.id > 0) {
      this.setCompaniesAndRoles(item);
    } else {
      delete this.item.id;
      this.item.save(this.getQueryParams()).subscribe(data => {
        this.setCompaniesAndRoles(item);
        setTimeout(() => {
          this.showToast('Элемент создан');
          if (this.dialogRef && this.dialogRef.close) {
            this.dialogRef.close();
            return;
          }
          this.router.navigate(['../', data.id], { relativeTo: this.route });
        }, 1000);
      });
    }
    return true;
  }

  setCompaniesAndRoles(item: Person) {
    if (this.itemform.value.roles) {
      const roles = [];
      this.itemform.value.roles.forEach(o => {
        roles.push(this.datastore.peekRecord(Role, o));
      });
      this.datastore.SetRelations<Person>(Person, item.id, null, null, 'role', 'roles', roles);
      item.roles = [];
    }
    if (this.itemform.value.companies) {
      const companies = [];
      this.itemform.value.companies.forEach(o => {
        companies.push(this.datastore.peekRecord(Company, o));
      });
      this.datastore.SetRelations<Person>(Person, item.id, null, null, 'company', 'companies', companies);
      item.companies = [];
    }
  }
}
