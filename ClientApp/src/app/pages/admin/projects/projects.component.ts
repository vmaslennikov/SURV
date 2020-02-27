import { ModelType } from 'angular2-jsonapi';

import { Project } from '../../../shared/Models/project';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class ProjectsComponent extends BaseGridComponent<Project> {
  sortProps: any = ['title'];
  getModel(): ModelType<Project> {
    return Project;
  }
  getRouteName(): string { return 'projects'; }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page },
      include: 'client,company,manager',
    };
  }
  getColumns(): Array<object> {
    return [
      // { maxWidth: '70', sortable: 'false', canAutoResize: 'false',
      //   draggable: 'false', resizeable: 'false', headerCheckboxable: 'true',
      //   checkboxable: 'true' },
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Клиент', prop: 'client.title', filtertype: 'string' },
      { name: 'Компания', prop: 'company.title', filtertype: 'string' },
      { name: 'Менеджер', prop: 'manager.fullName', filtertype: 'string' },
      { name: 'Блок', prop: 'strblock' },
      { name: 'Дата с', prop: 'strdateFrom', width: '120px' },
      { name: 'Дата по', prop: 'strdateTill', width: '120px' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}

