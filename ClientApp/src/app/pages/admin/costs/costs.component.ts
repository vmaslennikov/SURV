import { ModelType } from 'angular2-jsonapi';

import { Cost } from '../../../shared/Models/cost';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class CostsComponent extends BaseGridComponent<Cost> {
  getModel(): ModelType<Cost> {
    return Cost;
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Клиент', prop: 'client.title', filtertype: 'string' },
      { name: 'Грейд', prop: 'grade.title', filtertype: 'string' },
      { name: 'Валюта', prop: 'currency' },
      { name: 'Сумма', prop: 'sum' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'client,grade',
    };
  }
}

