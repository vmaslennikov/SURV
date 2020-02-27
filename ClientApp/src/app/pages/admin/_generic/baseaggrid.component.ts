// import { PagesRoutingModule } from './../../pages-routing.module';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { JsonApiModel, JsonApiQueryData } from 'angular2-jsonapi';
// import { ToastrService } from 'ngx-toastr';

// import { BaseObject } from '../../../shared/Models/_baseTitleObject';
// import { Datastore } from '../../../shared/services/datastore.service';
// import { ConstsService } from './../../../shared/services/consts.service';
// import { AgGridNg2 } from 'ag-grid-angular';

// @Component({
//   selector: 'ngx-baseaggrid',
//   template: `
//     <div class="">
//       <mat-toolbar color="primary">
//         <mat-toolbar-row>
//           <button mat-button (click)="add()" *ngIf="allowNew">
//             <mat-icon>add_circle</mat-icon>
//             Создать
//           </button>
//           <button mat-button (click)="update()" *ngIf="allowEdit">
//             <mat-icon>create</mat-icon>
//             Изменить
//           </button>
//           <button mat-button (click)="delete()" *ngIf="allowDelete">
//             <mat-icon>delete_sweep</mat-icon>
//             Удалить
//           </button>
//           <button mat-button (click)="refresh()">
//             <mat-icon>cached</mat-icon>
//             Обновить
//           </button>
//           <!--
//       <input
//         type='text'
//         style='margin:15px auto 15px 30px;width:100%;'
//         placeholder='Введите текст для поиска...'
//         (keyup)='updateFilter($event)'
//       />
//       -->
//         </mat-toolbar-row>
//       </mat-toolbar>

//       <ag-grid-angular
//         #agGrid
//         style="width: 100%; height: 600px;"
//         class="ag-theme-material"
//         [rowData]="items"
//         [columnDefs]="columns"
//         [pagination]="true"
//         [paginationPageSize]="10"
//         [localeText]="localeText"
//       >
//       </ag-grid-angular>
//     </div>
//   `
// })
// export class BaseAGGridComponent<T extends JsonApiModel> implements OnInit {
//   constructor(
//     public router: Router,
//     public route: ActivatedRoute,
//     public datastore: Datastore,
//     public toastrService: ToastrService,
//     public constsService: ConstsService
//   ) {
//     route.queryParams.subscribe(({ page }) => {
//       this.getItems(parseInt(page, 10) || 1);
//     });
//   }
//   public columns: Array<object> = this.getColumns();
//   public sortBy: any = [{ prop: 'id', dir: 'asc' }];
//   public sortProps: any = ['id'];
//   public items: T[];
//   public meta: any;
//   public page = 1;
//   public total_records = 0;
//   public size = 10;
//   public loading = false;
//   public selected = [];
//   public filters: any[] = [];
//   public localeText = RuLocaleText.DEFAULT_TRANSLATIONS;
//   @ViewChild('agGrid') agGrid: AgGridNg2;

//   public allowNew: boolean = this.constsService.IsAdmin;
//   public allowEdit: boolean = this.constsService.IsAdmin;
//   public allowDelete: boolean = this.constsService.IsAdmin;

//   /*

//   Operation	                  Prefix	Example
//   Equals	                    eq	?filter[attribute]=eq:value
//   Not Equals	                ne	?filter[attribute]=ne:value
//   Less Than	                  lt	?filter[attribute]=lt:10
//   Greater Than	              gt	?filter[attribute]=gt:10
//   Less Than Or Equal To	      le	?filter[attribute]=le:10
//   Greater Than Or Equal To	  ge	?filter[attribute]=ge:10
//   Like (string comparison)	  like	?filter[attribute]=like:value
//   In Set	                    in	?filter[attribute]=in:value1,value2
//   Not In Set	                nin	?filter[attribute]=nin:value1,value2
//   Is Null	                    isnull	?filter[attribute]=isnull:
//   Is Not Null	                isnotnull	?filter[attribute]=isnotnull:

//   */
//   supportedOperators = ['eq', 'ne', 'lt', 'gt', 'le', 'gt', 'like', 'in', 'nin', 'isnull', 'isnotnull'];

//   getPropValue(obj, propName: string) {
//     if (obj && propName) {
//       const props = propName.split('.');
//       if (props.length > 1) {
//         return this.getPropValue(obj[props[0]], props.slice(1, props.length).join('.'));
//       }
//       return obj[props[0]];
//     }
//     return null;
//   }
//   onLazyLoad(event) {
//     // in a real application, make a remote request to load data using state metadata from event
//     // event.first = First row offset
//     // event.rows = Number of rows per page
//     // event.sortField = Field name to sort with
//     // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
//     // filters: FilterMetadata object having field as key and filter value, filter matchMode as value
//     if (event.sortField) {
//       this.sortProps = [
//         (event.sortOrder === -1 ? '-' : '') + (event.sortField.startsWith('str') ? event.sortField.substring(3) : event.sortField)
//       ];
//     }
//     this.getItems(event.first / event.rows + 1);
//   }

//   getModel(): any {
//     return BaseObject;
//   }

//   getQueryParams(page: number): any {
//     const q = {
//       sort: this.sortProps,
//       page: { size: this.size, number: page }
//     };
//     return q;
//   }

//   getQuery(page: number): any {
//     const q = this.getQueryParams(page);
//     if (this.filters.length > 0) {
//       q['filter'] = {};
//       this.filters.forEach(f => {
//         q['filter'][f.prop] = f.operator + ':' + f.value;
//       });
//     }
//     return q;
//   }
//   getColumns(): Array<object> {
//     return [
//       // {
//       //   maxWidth: '70', sortable: 'false', canAutoResize: 'false',
//       //   draggable: 'false', resizeable: 'false',
//       //   headerCheckboxable: 'true', checkboxable: 'true',
//       // },
//       { headerName: 'ИД', field: 'id', width: 60, sortable: true, filter: true },
//       { headerName: 'Название', field: 'title', sortable: true, filter: true },
//       { headerName: 'Создано', field: 'strcreatedAt', width: 120, sortable: true, filter: true },
//       { headerName: 'Изменено', field: 'strmodifiedAt', width: 120, sortable: true, filter: true },
//       { headerName: 'Активно', field: 'strActive', width: 80, sortable: true, filter: true }
//     ];
//   }

//   // https://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http
//   getItems(page: number) {
//     this.loading = true;
//     this.page = page || 1;
//     this.datastore.findAll(this.getModel(), this.getQuery(page), this.constsService.noCacheHeaders).subscribe(
//       (items: JsonApiQueryData<T>) => {
//         this.fillProperties(items);
//         this.loading = false;
//       },
//       (error): void => {
//         this.loading = false;
//       }
//     );
//   }

//   fillProperties(items: JsonApiQueryData<T>) {
//     this.meta = items.getMeta();
//     this.total_records = items.getMeta().meta['total-records'];
//     this.items = items.getModels();
//     this.agGrid.api.setRowData(this.items);
//     this.agGrid.api.sizeColumnsToFit();

//     // this.agGrid.api.selectAll();
//     // this.agGrid.api.updateRowData({update: this.items});
//     // this.agGrid.datasource = this.items;
//     if (this.items.length === 0 && this.page > 1) {
//       this.getItems(this.page - 1);
//     }
//   }

//   ngOnInit() {
//     this.getItems(1);
//   }

//   public deleteItem(item: T) {
//     this.datastore.deleteRecord(this.getModel(), item.id).subscribe(() => {
//       this.showToast('Элемент удален');
//       this.getItems(this.page);
//       // this.getItems(this.page);
//     });
//   }

//   public setPage(pageInfo: { offset: number }) {
//     this.getItems(pageInfo.offset + 1);
//   }

//   public onSort(event: { sorts: any[] }) {
//     //  event was triggered, start sort sequence
//     this.loading = true;
//     //  emulate a server request with a timeout
//     //  this is only for demo purposes, normally
//     //  your server would return the result for
//     //  you and you would just set the rows prop
//     const sort = event.sorts[0];
//     this.sortProps = [(sort.dir === 'desc' ? '-' : '') + (sort.prop.startsWith('str') ? sort.prop.substring(3) : sort.prop)];
//     this.getItems(this.page);
//   }

//   onSelect({ selected }) {
//     // console.log('Select Event', selected, this.selected);

//     this.selected.splice(0, this.selected.length);
//     this.selected.push(...selected);
//   }

//   add() {
//     // console.log('add Event');
//     // this.router.navigate(['pages', this.getRouteName(), 'new']);
//     this.router.navigate(['new'], { relativeTo: this.route });
//   }

//   update() {
//     // console.log('delete Event');
//     if (this.selected.length !== 1) {
//       return;
//     }
//     // this.router.navigate(['pages', this.getRouteName(), this.selected[0].id]);
//     this.router.navigate([this.selected[0].id], { relativeTo: this.route });
//   }

//   delete() {
//     // console.log('delete Event');
//     if (this.selected.length === 0) {
//       return;
//     }
//     if (confirm('Выбранные объекты будут удалены. Вы уверены?')) {
//       this.selected.forEach(item => {
//         this.deleteItem(item);
//       });
//     }
//   }

//   refresh() {
//     this.getItems(this.page);
//   }

//   updateFilter(event) {
//     const val = event.target.value.toLowerCase();
//     return;
//   }

//   onFilter(e) {
//     if (localStorage) {
//       localStorage.setItem('filters', JSON.stringify(e));
//     }
//   }

//   filter(value, prop, operator) {
//     if (this.supportedOperators.indexOf(operator) !== -1) {
//       if (!value) {
//         this.filters = this.filters.filter(f => f.prop !== prop);
//       } else {
//         const tmp = this.filters.filter(f => f.prop === prop);
//         if (tmp.length > 0) {
//           tmp[0].operator = operator;
//           tmp[0].value = value;
//         } else {
//           this.filters.push({
//             prop: prop,
//             operator: operator,
//             value
//           });
//         }
//       }
//       this.getItems(this.page);
//     }
//   }

//   showToast(message: string, position = 'top-right', status = 'Success') {
//     this.toastrService.info(message, `Информационное сообщение`);
//   }
// }

// export class RuLocaleText {
//   static DEFAULT_TRANSLATIONS: {
//     loadingOoo: 'Загрузка...';
//     empty: 'Выбрать';
//     equals: 'Равно';
//     notEqual: 'Не равно';
//     lessThan: 'Меньше';
//     greaterThan: 'Больше';
//     inRange: 'В диапазоне';
//     lessThanOrEqual: 'Меньше или равно';
//     greaterThanOrEqual: 'Больше или равно';
//     filterOoo: 'Фильтр...';
//     contains: 'Содержит';
//     notContains: 'Не содержит';
//     startsWith: 'Начинается с';
//     endsWith: 'Заканчивается на';
//     searchOoo: 'Поиск...';
//     selectAll: 'Выбрать все';
//     applyFilter: 'Применить фильтр';
//     clearFilter: 'Очистить фильтр';
//     andCondition: 'И';
//     orCondition: 'ИЛИ';
//   };

//   static ru: {
//     'agGrid.page': 'Страница',
//     'agGrid.more': 'ещё',
//     'agGrid.to': 'к',
//     'agGrid.of': 'из',
//     'agGrid.next': 'Следующая',
//     'agGrid.last': 'Последняя',
//     'agGrid.first': 'Первая',
//     'agGrid.previous': 'Предыдущая',
//     'agGrid.loadingOoo': 'Загрузка...',

//     'agGrid.selectAll': 'Выбрать все',
//     'agGrid.searchOoo': 'Поиск...',
//     'agGrid.blanks': 'Пусто',

//     'agGrid.filterOoo': 'Фильтровать...',
//     'agGrid.applyFilter': 'Применить фильтр...',

//     'agGrid.equals': 'Эквивалентно',
//     'agGrid.lessThan': 'Меньше, чем',
//     'agGrid.greaterThan': 'Больше, чем',

//     'agGrid.contains': 'Содержит',
//     'agGrid.startsWith': 'Начинается с',
//     'agGrid.endsWith': 'Заканчивается на',

//     'agGrid.group': 'Группа',

//     'agGrid.columns': 'Столбцы',
//     'agGrid.rowGroupColumns': 'Столбцы группировки по строкам',
//     'agGrid.rowGroupColumnsEmptyMessage': 'Перетяните сюда для группировки по строкам',
//     'agGrid.valueColumns': 'Столбцы со значениями',
//     'agGrid.pivotMode': 'Режим сводной таблицы',
//     'agGrid.groups': 'Группировка по строкам',
//     'agGrid.values': 'Значения',
//     'agGrid.pivots': 'Заголовки столбцов',
//     'agGrid.valueColumnsEmptyMessage': 'Перетяните сюда для агрегации',
//     'agGrid.pivotColumnsEmptyMessage': 'Перетяните сюда, чтобы задать загаловки столбцов',
//     'agGrid.toolPanelButton': 'Панель инструментов',

//     'agGrid.noRowsToShow': 'Нет данных',

//     'agGrid.pinColumn': 'Закрепить колонку',
//     'agGrid.valueAggregation': 'Агрегация по значению',
//     'agGrid.autosizeThiscolumn': 'Задать авторазмер этой колонки',
//     'agGrid.autosizeAllColumns': 'Задать авторазмер всех колонок',
//     'agGrid.groupBy': 'Группировать по',
//     'agGrid.ungroupBy': 'Разгруппировать по',
//     'agGrid.resetColumns': 'Сбросить столбцы',
//     'agGrid.expandAll': 'Развернуть все',
//     'agGrid.collapseAll': 'Свернуть все',
//     'agGrid.toolPanel': 'Панель инструментов',
//     'agGrid.export': 'Экспорт',
//     'agGrid.csvExport': 'Экспорт в CSV',
//     'agGrid.excelExport': 'Экспорт в Excel',

//     'agGrid.pinLeft': 'Закрепить слева',
//     'agGrid.pinRight': 'Закрепить справа',
//     'agGrid.noPin': 'Не прикреплять',

//     'agGrid.sum': 'Сумма',
//     'agGrid.min': 'Минимум',
//     'agGrid.max': 'Максимум',
//     'agGrid.none': 'Пусто',
//     'agGrid.count': 'Количество',
//     'agGrid.average': 'Усредненное значение',

//     'agGrid.copy': 'Копировать',
//     'agGrid.copyWithHeaders': 'Копировать с заголовком',
//     'agGrid.ctrlC': 'Ctrl+C',
//     'agGrid.paste': 'Вставить',
//     'agGrid.ctrlV': 'Ctrl+V'
//   };

// }
