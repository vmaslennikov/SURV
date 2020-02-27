import { ModelType } from 'angular2-jsonapi';

import { Tabel } from '../../../shared/Models/tabel';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class TabelsComponent extends BaseGridComponent<Tabel> {
  getModel(): ModelType<Tabel> {
    return Tabel;
  }
  getRouteName(): string { return 'tabels'; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'person,company,approver',
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Год', prop: 'year' },
      { name: 'Месяц', prop: 'month' },
      { name: 'Заполнен', prop: 'strfill' },
      { name: 'Согласован', prop: 'strapprove' },

      { name: 'Сотрудник', prop: 'person.fullName', filtertype: 'string' },
      { name: 'Согласующий', prop: 'approver.fullName', filtertype: 'string' },
      { name: 'Компания', prop: 'company.title', filtertype: 'string' },

      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

