import { ModelType } from 'angular2-jsonapi';

import { Hrmonth } from '../../../shared/Models/hrmonth';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class HrmonthsComponent extends BaseGridComponent<Hrmonth> {
  allowNew: boolean;
  allowEdit: boolean;
  sortProps: any = ['-date'];

  getModel(): ModelType<Hrmonth> {
    return Hrmonth;
  }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'approveperson',
    };
  }
  getColumns(): Array<object> {
    return [
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Дата', prop: 'strdate' },
      // { name: 'Дата согласования', prop: 'strapproveDate' },
      // { name: 'Согласующий', prop: 'approveperson.fullName', filtertype: 'string' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

