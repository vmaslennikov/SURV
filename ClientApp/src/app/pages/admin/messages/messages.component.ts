import { Component } from '@angular/core';
import { Message } from 'src/app/shared/Models/message';

import { BaseGridComponent } from '../_generic/basegrid.component';

export class MessagesComponent extends BaseGridComponent<Message> {
  allowNew = false;
  allowEdit = false;
  allowDelete = false;
  sortProps: any = ['-id'];
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'person',
    };
  }
  getColumns(): Array<object> {
    return [
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Текст сообщения', prop: 'body', filtertype: 'string' },
      { name: 'Получатель', prop: 'person.fullName', filtertype: 'string' },
      { name: 'Отправлено', prop: 'strСompleted', width: '100px' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      // { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      // { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
  getModel(): any { return Message; }
}
