import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModelType } from 'angular2-jsonapi';

import { Client } from '../../../shared/Models/client';
import { Person } from '../../../shared/Models/person';
import { Usercalendar } from '../../../shared/Models/usercalendar';
import { BaseFormComponent } from '../_generic/baseform.component';
import { ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';

export class UsercalendarFormComponent extends BaseFormComponent<Usercalendar> {
  getModel(): ModelType<Usercalendar> { return Usercalendar; }
  getQueryParams(): any {
    return {
      include: 'client,person',
    };
  }
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
          valueProp: 'id',
          labelProp: 'title',
          options: this.datasources.getClients(),
        },
      },
      {
        key: 'person', type: 'select',
        templateOptions: {
          label: 'Сотрудник',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          options: this.consts.IsAdmin ? this.datasources.getActivePersons() : this.datasources.getMe()
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'dayType', type: 'select',
            templateOptions: {
              label: 'Тип дня',
              required: true,
              options: [
                { label: 'Командировка', value: 0 },
                { label: 'Болезнь', value: 1 },
                { label: 'Отпуск', value: 2 },
                { label: 'Другое', value: 3 },
              ],
            },
          },
          {
            className: 'col-md-4',
            key: 'dateFrom', type: 'datepicker',
            templateOptions: { label: 'Дата с', type: 'text', required: true },
          },
          {
            className: 'col-md-4',
            key: 'dateTill', type: 'datepicker',
            templateOptions: { label: 'Дата по', type: 'text', required: true },
          },
        ]
      },
      {
        key: 'active', type: 'checkbox',
        templateOptions: { label: 'Запись активна' },
      },
    ];
  }

  setValueForm(item: Usercalendar) {
    this.itemform.setValue({
      client: this.item.client ? this.item.client.id : null,
      person: this.item.person ? this.item.person.id : null,
      title: this.item.title,
      dateFrom: this.item.strdatepickerFrom,
      dateTill: this.item.strdatepickerTill,
      dayType: this.item.dayType,
      active: this.item.active,
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.dateFrom = this.itemform.value.dateFrom;
    item.dateTill = this.itemform.value.dateTill;
    item.dayType = this.itemform.value.dayType;
    item.active = this.itemform.value.active;

    //relationships
    item.person = this.datastore.peekRecord(Person, this.itemform.value.person);
    item.client = this.datastore.peekRecord(Client, this.itemform.value.client);
    return false;
  }

  subscribeOnId(route: ActivatedRoute, datastore: Datastore) {
    if (this.dialogData && this.dialogData.Id) {
      this.findRecord(datastore, this.dialogData.Id);
      return;
    }
    super.subscribeOnId(route, datastore);
  }
}
