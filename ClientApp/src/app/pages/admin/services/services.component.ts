import { ModelType } from 'angular2-jsonapi';

import { Service } from '../../../shared/Models/service';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class ServicesComponent extends BaseGridComponent<Service> {
  sortProps: any = ['title'];
  getModel(): ModelType<Service> {
    return Service;
  }
  getRouteName(): string { return 'services'; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'company,servicetype,unit',
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
      { name: 'Подразделение', prop: 'unit.title', filtertype: 'string' },
      { name: 'Тип', prop: 'servicetype.title', filtertype: 'string' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

