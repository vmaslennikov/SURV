import { Alert } from '../../../shared/Models/alert';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class AlertsComponent extends BaseGridComponent<Alert> {
  getColumns(): Array<object> {
    return [
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq'  },
      { name: 'Код', prop: 'code' , filtertype: 'string'},
      { name: 'Название', prop: 'title' , filtertype: 'string'},
      // { name: 'Тело оповещения', prop: 'body' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
  getModel(): any { return Alert; }
  getRouteName(): string { return 'alerts'; }
}
