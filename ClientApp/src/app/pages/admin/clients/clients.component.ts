import { ModelType } from 'angular2-jsonapi';

import { Client } from '../../../shared/Models/client';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class ClientsComponent extends BaseGridComponent<Client> {
  sortProps: any = ['title'];
  getModel(): ModelType<Client> {
    return Client;
  }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'company' };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filterMatchMode: 'eq'},
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Компания', prop: 'company.title', filtertype: 'string' },
      { name: 'Не резидент', prop: 'strnonResident' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

