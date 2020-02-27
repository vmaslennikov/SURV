import { ModelType } from 'angular2-jsonapi';

import { Person } from '../../../shared/Models/person';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class PersonsComponent extends BaseGridComponent<Person> {
  sortProps: any = ['fullName'];
  getRouteName(): string { return 'persons'; }
  getModel(): ModelType<Person> { return Person; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'grade,manager,unit',
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Номер', prop: 'tabelNumber', width: '70px', filtertype: 'string' },
      { name: 'ФИО', prop: 'fullName', filtertype: 'string' },
      { name: 'Логин', prop: 'userName', filtertype: 'string' },
      { name: 'Email', prop: 'email', filtertype: 'string' },
      { name: 'Грейд', prop: 'grade.title', filtertype: 'string' },
      { name: 'Подразделение', prop: 'unit.title', filtertype: 'string' },
      { name: 'Менеджер', prop: 'manager.fullName', filtertype: 'string' },
      { name: 'Принят', prop: 'strdateFrom', width: '90px' },
      { name: 'Снят', prop: 'strdateTill', width: '90px' },
      // { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      // { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Тип работы', prop: 'strworkType' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

