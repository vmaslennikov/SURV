import { ModelType } from 'angular2-jsonapi';

import { Errormessage } from '../../../shared/Models/errormessage';
import { BaseGridComponent } from '../_generic/basegrid.component';
// import { BaseAGGridComponent } from '../_generic/baseaggrid.component';

export class ErrormessagesComponent extends BaseGridComponent<Errormessage> {
  allowNew = true;
  allowEdit = true;
  allowDelete = false;
  sortProps: any = ['-id'];
  getModel(): ModelType<Errormessage> {
    return Errormessage;
  }
  getQueryParams(page: number): any {
    if (!this.constsService.IsAdmin) {
      return {
        sort: this.sortProps,
        page: { size: this.size, number: page },
        filter: {
          createdbyid: this.constsService.currentUserId
        }
      };
    }
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page }
    };
  }
  // getColumns(): Array<object> {
  //   return [
  //     { headerName: 'ИД', field: 'id', width: 60, sortable: true, filter: true },
  //     { headerName: 'Краткое описание', field: 'title', sortable: true, filter: true },
  //     // { headerName: 'Полное описание', field: 'body' },
  //     { headerName: 'Создано', field: 'strcreatedAt', width: 120, sortable: true, filter: true },
  //     { headerName: 'Изменено', field: 'strmodifiedAt', width: 120, sortable: true, filter: true },
  //     { headerName: 'Активно', field: 'strActive', width: 80, sortable: true, filter: true }
  //   ];
  // }
  getColumns(): Array<object> {
    return [
      { name: 'ИД', prop: 'id', width: '60px', filtertype: 'string', filterMatchMode: 'eq' },
      { name: 'Краткое описание', prop: 'title', filtertype: 'string' },
      // { name: 'Полное описание', prop: 'body' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' },
      { name: 'Активно', prop: 'strActive', width: '80px' },
    ];
  }
}
