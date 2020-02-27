import { ModelType } from 'angular2-jsonapi';

import { Workday } from '../../../shared/Models/workday';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class WorkdaysComponent extends BaseGridComponent<Workday> {
  allowNew: boolean = this.constsService.IsHr ||  this.constsService.IsAdmin;
  allowEdit: boolean = this.constsService.IsHr ||  this.constsService.IsAdmin;
  allowDelete: boolean = this.constsService.IsHr ||  this.constsService.IsAdmin;
  sortProps: any = ['-date'];
  getModel(): ModelType<Workday> {
    return Workday;
  }
  getRouteName(): string { return 'workdays'; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Дата', prop: 'strdate' },
      { name: 'Тип', prop: 'strdayType' },
      //{ name: 'Коментарий', prop: 'comment' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

