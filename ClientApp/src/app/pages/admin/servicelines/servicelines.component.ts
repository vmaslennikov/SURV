import { ModelType } from 'angular2-jsonapi';

import { Serviceline } from '../../../shared/Models/serviceline';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class ServicelinesComponent extends BaseGridComponent<Serviceline> {
  getModel(): ModelType<Serviceline> {
    return Serviceline;
  }
  getRouteName(): string { return 'servicelines'; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'service,project,client,tabel',
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },

      { name: 'Проект', prop: 'project.title', filtertype: 'string' },
      { name: 'Клиент', prop: 'client.title', filtertype: 'string' },
      { name: 'Услуга', prop: 'service.title', filtertype: 'string' },
      { name: 'Табель', prop: 'tabel.title', filtertype: 'string' },

      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

