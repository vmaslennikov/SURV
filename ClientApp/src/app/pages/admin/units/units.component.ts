import { ModelType } from 'angular2-jsonapi';

import { Unit } from '../../../shared/Models/unit';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class UnitsComponent extends BaseGridComponent<Unit> {
  sortProps: any = ['title'];
  getModel(): ModelType<Unit> { return Unit; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'company,manager',
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Компания', prop: 'company.title', filtertype: 'string' },
      { name: 'Менеджер', prop: 'manager.fullName', filtertype: 'string' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}
