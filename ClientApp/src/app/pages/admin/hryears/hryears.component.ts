import { ModelType } from 'angular2-jsonapi';

import { Hryear } from '../../../shared/Models/hryear';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class HryearsComponent extends BaseGridComponent<Hryear> {

  allowNew: boolean;
  allowEdit: boolean;
  sortProps: any = ['-date'];

  getModel(): ModelType<Hryear> {
    return Hryear;
  }
  getRouteName(): string { return 'hryears'; }
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

