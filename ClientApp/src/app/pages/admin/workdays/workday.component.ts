import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModelType } from 'angular2-jsonapi';

import { Workday } from '../../../shared/Models/workday';
import { BaseFormComponent } from '../_generic/baseform.component';
import { ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';

export class WorkdayFormComponent extends BaseFormComponent<Workday> {
  getModel(): ModelType<Workday> {
    return Workday;
  }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title',
        type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true }
      },
      {
        key: 'dayType',
        type: 'select',
        templateOptions: {
          label: 'Тип дня',
          required: true,
          options: [{ label: 'Рабочий день', value: 0 }, { label: 'Нерабочий день', value: 1 }, { label: 'Короткий день', value: 2 }]
        }
      },
      {
        key: 'date',
        type: 'datepicker',
        templateOptions: { label: 'Дата', type: 'text', required: true }
      },
      {
        key: 'comment',
        type: 'textarea',
        templateOptions: { rows: 3, label: 'Комментарий', placeholder: 'Введите значение' }
      },
      {
        key: 'active',
        type: 'checkbox',
        className: 'hide',
        templateOptions: { label: 'Запись активна' }
      }
    ];
  }

  subscribeOnId(route: ActivatedRoute, datastore: Datastore) {
    if (this.dialogData && this.dialogData.workdayId === 'new' && this.dialogData.date) {
      this.model = ({
        id: '',
        title: '',
        comment: '',
        date: this.dialogData.date,
        dayType: 1,
        active: true
      });
    }
    if (this.dialogData && this.dialogData.workdayId && this.dialogData.workdayId !== 'new') {
      this.findRecord(datastore, this.dialogData.workdayId);
      return;
    }
    super.subscribeOnId(route, datastore);
  }

  setValueForm(item: Workday) {
    this.itemform.setValue({
      title: this.item.title,
      comment: this.item.comment || '',
      date: this.item.strdatepicker,
      dayType: this.item.dayType,
      active: this.item.active
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.comment = this.itemform.value.comment;
    item.date = this.itemform.value.date;
    item.dayType = this.itemform.value.dayType;
    item.active = this.itemform.value.active;
    return false;
  }

  // ngOnInit() {
  //   if (this.dialogData && this.dialogData.workdayId === 'new' && this.dialogData.date) {
  //     this.item = ({
  //       title: '',
  //       comment: '',
  //       date: this.dialogData.date,
  //       dayType: 1,
  //       active: true
  //     });
  //   }
  // }
}
