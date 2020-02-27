import { ModelType } from 'angular2-jsonapi';

import { Usercalendar } from '../../../shared/Models/usercalendar';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class UsercalendarsComponent extends BaseGridComponent<Usercalendar> {
  allowNew = true;
  allowEdit = true;
  allowDelete = true;
  sortProps: any = ['-dateFrom'];
  getModel(): ModelType<Usercalendar> {
    return Usercalendar;
  }
  getRouteName(): string { return 'usercalendars'; }
  getQueryParams(page: number): any {
    if (this.constsService.IsHr || this.constsService.IsAdmin) {
      return {
        sort: this.sortProps,
        page: { size: this.size, number: page },
        include: 'client,person'
      };
    }
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'client,person',
      filter: {
        'person.id': this.constsService.currentUserId,
      }
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Клиент', prop: 'client.title', filtertype: 'string' },
      { name: 'Сотрудник', prop: 'person.fullName', filtertype: 'string' },
      { name: 'Дата с', prop: 'strdateFrom' },
      { name: 'Дата по', prop: 'strdateTill' },
      { name: 'Тип', prop: 'strdayType' },
      // { name: 'Коментарий', prop: 'comment' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

