import { startWith } from 'rxjs/operators';
import { DatasourcesService } from './../services/datasources.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { MatDialog, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { addDays, addMonths, format, getDaysInMonth, isEqual, isWithinRange, parse } from 'date-fns';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { ToastrService } from 'ngx-toastr';
import { WsshourFormComponent } from 'src/app/pages/admin/wsshours/wsshour.component';

import { ServicelineFormComponent } from '../../pages/admin/servicelines/serviceline.component';
import { Company } from '../Models/company';
import { Person } from '../Models/person';
import { Serviceline } from '../Models/serviceline';
import { Tabel } from '../Models/tabel';
import { Workday } from '../Models/workday';
import { ConstsService } from '../services/consts.service';
import { Datastore } from '../services/datastore.service';
import { Usercalendar } from './../Models/usercalendar';
import { Message } from '../Models/Message';

@Component({
  selector: 'ngx-tabel',
  templateUrl: './tabel.component.html',
  styles: [
    `
      #tblmonths .mat-tab-label {
        padding: 0 !important;
      }
      #tblmonths.mat-tab-group
        > .mat-tab-header
        > .mat-tab-label-container
        > .mat-tab-list
        > .mat-tab-labels
        .mat-tab-label {
        padding: 0 !important;
      }
      #tblmonths .none {
        background-color: transparent;
        padding: 14px;
      }
      #tblmonths .filled {
        background-color: #80deea;
        padding: 14px;
      }
      #tblmonths .approved {
        background-color: #81c784;
        padding: 14px;
      }
    `
  ]
})
export class UserTabelComponent implements OnInit {
  get Year() {
    return this.consts.Year;
  }
  get Month() {
    return this.consts.Month;
  }
  get Company() {
    return this.consts.CompanyId;
  }
  get Person() {
    return this.personId;
  }
  @Input()
  public personId: string;
  public tabel: Tabel;
  public tabelId: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public datastore: Datastore,
    public datasource: DatasourcesService,
    public toastrService: ToastrService,
    public consts: ConstsService,
    public dialog: MatDialog,
    public dateFns: DateFnsConfigurationService
  ) {
    route.params.subscribe(({ id }) => {
      this.personId = id;
    });
  }

  allowNew: boolean;
  allowEdit: boolean;
  allowDelete: boolean;
  allowFill: boolean;
  allowApprove: boolean;
  allowDisApprove: boolean;
  allowOpen: boolean;
  allowCopy: boolean;

  //  [selectionType]="'checkbox'"
  columns: Array<object> = this.getColumns();
  sortBy: any = [{ prop: 'id', dir: 'asc' }];
  sortProps: any = ['id'];
  items: Serviceline[] = [];
  meta: any;
  page = 1;
  total_records = 0;
  size = 100;
  loading = false;
  selected = [];
  userDays: Array<Usercalendar> = [];
  workDays: Array<Workday> = [];
  fullname = '';
  isHalfTime = false;
  @ViewChild('yearsTabGroup') yearsTabGroup: MatTabGroup;
  @ViewChild('monthsTabGroup') monthsTabGroup: MatTabGroup;
  @ViewChild('companiesTabGroup') companiesTabGroup: MatTabGroup;

  @ViewChild('disDialog') disDialog: TemplateRef<any>;
  @ViewChild('copyMonthDialog') copyMonthDialog: TemplateRef<any>;
  @ViewChild('servicesInMonthDialog') servicesInMonthDialog: TemplateRef<any>;

  Years: any[] = Array.from({ length: 12 }, (x, i) => {
    const temp = 2010 + i;
    return { title: temp, active: temp === this.consts.Year };
  });
  Months: any[] = Array.from({ length: 12 }, (x, i) => {
    return {
      title: i,
      // active: i == (this.consts.Month - 1),
      name: format(new Date(this.Year, i), 'MMMM', { locale: ruLocale }),
      class: 'none'
    };
  });
  Companies: Company[];
  disComment: string = null;
  beforeMonths: any[] = [];
  beforeMonthServices: any[] = [];
  beforeMonthServiceIds: any[] = [];
  beforeMonth: any = null;

  @ViewChild('#pTable') pTable;
  setYear(index: number) {
    this.consts.Year = this.Years[index].title;
    this.refreshBeforeMonths();
    this.getItems(1);
  }
  setMonth(index: number) {
    this.consts.Month = parseInt(this.Months[index].title, 10) + 1;
    this.refreshBeforeMonths();
    this.getItems(1);
  }
  setCompany(index: number) {
    this.consts.CompanyId = this.Companies[index].Id;
    this.getItems(1);
  }
  getModel(): any {
    return Tabel;
  }

  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page }
    };
  }

  get DaysInMonth() {
    return getDaysInMonth(new Date(this.Year, this.Month - 1));
  }
  get cDate() {
    return new Date(this.Year, this.Month - 1);
  }

  getColumns(): Array<object> {
    const columns = [];
    // columns.push({
    //   maxWidth: '70', sortable: 'false', canAutoResize: 'false',
    //   draggable: 'false', resizeable: 'false',
    //   headerCheckboxable: 'true', checkboxable: 'true',
    // });
    // columns.push({ name: 'ИД', prop: 'id', width: '100' });
    columns.push({
      name: 'Проект',
      prop: 'project.title',
      width: '200px',
      minWidth: '140',
      cellClass: 'va-top tabel-min-width'
      // , headerClass: 'cellShort', cellClass: 'cellShort'
    });
    columns.push({
      name: 'Услуга',
      prop: 'service.title',
      cellClass: 'va-top tabel-min-width',
      width: '200px'
      // minWidth: '140',
      // , headerClass: 'cellShort', cellClass: 'cellShort'
    });
    columns.push({
      name: 'Результат',
      prop: 'result',
      cellClass: 'va-top tabel-min-width',
      width: '200px'
      // minWidth: '240',
      //  , headerClass: 'cellShort', cellClass: 'cellShort'
    });
    columns.push({
      name: 'Сум',
      prop: 'summ',
      width: '40px',
      headerClass: 'cellShort',
      cellClass: 'cellShort'
    });
    const start = new Date(this.Year, this.Month - 1);
    for (let d = 1, l = this.DaysInMonth; d <= l; d++) {
      const dt = addDays(start, d - 1);
      const weekend = dt.getDay() === 6 || dt.getDay() === 0;
      const n = format(dt, 'DD dd', { locale: ruLocale });
      // const n = format(dt, 'DD<br/>dd', { locale: ruLocale });
      columns.push({
        name: n,
        prop: 'd_' + d,
        width: '30px',
        resizeable: false,
        sortable: false,
        draggable: false,
        date: dt,
        headerClass: weekend ? 'cellShort day-nowork' : 'cellShort',
        cellClass: weekend ? 'cellShort day-nowork' : 'cellShort',
        class: 'cellShort',
        summaryFunc: cells => this.sumByDay(cells)
      });
    }
    return columns;
  }

  getPropValue(obj, propName: string) {
    if (obj && propName) {
      const props = propName.split('.');
      if (props.length > 1) {
        return this.getPropValue(
          obj[props[0]],
          props.slice(1, props.length).join('.')
        );
      }
      return obj[props[0]];
    }
    return null;
  }

  /*

  Operation	                  Prefix	Example
  Equals	                    eq	?filter[attribute]=eq:value
  Not Equals	                ne	?filter[attribute]=ne:value
  Less Than	                  lt	?filter[attribute]=lt:10
  Greater Than	              gt	?filter[attribute]=gt:10
  Less Than Or Equal To	      le	?filter[attribute]=le:10
  Greater Than Or Equal To	  ge	?filter[attribute]=ge:10
  Like (string comparison)	  like	?filter[attribute]=like:value
  In Set	                    in	?filter[attribute]=in:value1,value2
  Not In Set	                nin	?filter[attribute]=nin:value1,value2
  Is Null	                    isnull	?filter[attribute]=isnull:
  Is Not Null	                isnotnull	?filter[attribute]=isnotnull:

  */
  getTabelsByYear() {
    if (this.Year > 0) {
      const qByTabels = {
        sort: this.sortProps,
        page: { size: 100, number: 1 },
        filter: {
          'company.id': this.Company,
          'person.id': this.Person,
          year: this.Year
        }
      };
      this.datastore
        .findAll(Tabel, qByTabels, this.consts.noCacheHeaders)
        .subscribe((items: JsonApiQueryData<Tabel>) => {
          const tbls = items.getModels();
          this.Months.forEach(m => {
            const tbl = tbls.filter(t => parseInt(m.title, 10) + 1 === t.month);
            const cls = [];
            if (tbl && tbl.length && tbl[0].fill) {
              cls.push('filled');
            }
            if (tbl && tbl.length && tbl[0].approve) {
              cls.push('approved');
            }
            m.class = cls && cls.length > 0 ? cls.join(' ') : 'none';
          });
        });
    }
  }

  getItems(page: number) {
    this.getTabelsByYear();
    this.loading = true;
    this.columns = this.getColumns();
    this.page = page || 1;
    this.loading = true;
    this.tabel = null;
    this.tabelId = null;
    this.items = [];
    this.resetTabelToolbar();
    const dt = new Date(this.Year, this.Month - 1);
    const qByUserCalendar = {
      page: { size: 100, number: 1 },
      sort: ['dateFrom'],
      include: 'client',
      filter: {
        'person.id': this.Person,
        dateFrom: ['le:' + format(addMonths(dt, 1), 'YYYY.MM.DD')],
        dateTill: ['ge:' + format(dt, 'YYYY.MM.DD')]
      }
    };
    const qByWorkDays = {
      page: { size: 100, number: 1 },
      sort: ['date'],
      filter: {
        date: [
          'ge:' + format(dt, 'YYYY.MM.DD'),
          'le:' + format(addMonths(dt, 1), 'YYYY.MM.DD')
        ]
      }
    };
    const qByTabels = {
      sort: this.sortProps,
      page: { size: 100, number: 1 },
      include:
        'person,company,services,services.service,services.project,services.hours',
      filter: {
        'company.id': this.Company,
        'person.id': this.Person,
        year: this.Year,
        month: this.Month
      }
      // &filter[company.id]=eq:1&filter[person.id]=eq:232&filter[year]=eq:2012&filter[month]=eq:10&
    };
    this.datastore
      .findAll(Usercalendar, qByUserCalendar, this.consts.noCacheHeaders)
      .subscribe(r1 => {
        this.userDays = r1.getModels();
        this.datastore
          .findAll(Workday, qByWorkDays, this.consts.noCacheHeaders)
          .subscribe(r2 => {
            this.workDays = r2.getModels();
            this.datastore
              .findAll(Tabel, qByTabels, this.consts.noCacheHeaders)
              .subscribe(
                (items: JsonApiQueryData<Tabel>) => {
                  this.fillProperties(items);
                  this.loading = false;
                },
                (error): void => {
                  this.loading = false;
                }
              );
          });
      });
  }

  resetTabelToolbar() {
    this.allowNew = false;
    this.allowEdit = false;
    this.allowDelete = false;
    this.allowFill = false;
    this.allowApprove = false;
    this.allowDisApprove = false;
    this.allowCopy = false;
    this.allowOpen = false;
  }

  fillProperties(items: JsonApiQueryData<Tabel>) {
    this.meta = items.getMeta();
    const temp = items.getModels();

    if (temp.length > 0) {
      const item = temp[0];
      this.tabel = item;
      this.tabelId = item.id;
      const cD = this.cDate;
      this.items = item.services || [];
      this.total_records = this.items.length;
      this.items.forEach(s => {
        for (let index = (s.hours || []).length - 1; index >= 0; index--) {
          const h = s.hours[index];
          if (
            !(
              cD.getFullYear() === h.date.getFullYear() &&
              cD.getMonth() === h.date.getMonth()
            )
          ) {
            s.hours.splice(index, 1);
          }
        }
        s.summ =
          (s.hours || []).length === 0
            ? 0
            : s.hours.reduce((sum, cur) => sum + cur.hours, 0);
        for (let index = 0; index < 31; index++) {
          delete s['d_' + index];
        }
        (s.hours || []).forEach(h => {
          s['d_' + h.date.getDate()] = h.hours;
        });
      });

      this.allowCopy = !this.tabel.fill;
      this.allowNew = !this.tabel.fill;
      this.allowEdit = !this.tabel.fill;
      this.allowDelete = !this.tabel.fill;
      this.allowFill =
        !this.tabel.fill &&
        this.items.length > 0 &&
          (this.consts.IsAdmin || this.personId === this.tabel.person.id);

      this.allowApprove =
        !this.tabel.approve &&
        this.tabel.fill &&
        this.items.length > 0 &&
        (this.consts.ManageUser(parseInt(this.personId, 10)) ||
          this.consts.IsAdmin);

      this.allowDisApprove =
        !this.tabel.approve &&
        this.tabel.fill &&
        this.items.length > 0 &&
        (this.consts.ManageUser(parseInt(this.personId, 10)) ||
          this.consts.IsAdmin);

      this.allowOpen = this.tabel.fill && this.consts.IsAdmin;
    } else if (this.consts.currentUser.User) {
      const cdate = this.cDate;
      const from = new Date(this.consts.currentUser.User.DateFrom);
      if (from.getDate() !== 1) {
        from.setDate(1);
      }
      const till =
        this.consts.currentUser.User.DateTill !== '1970-01-01T00:00:00'
          ? new Date(this.consts.currentUser.User.DateTill)
          : null;
      if (cdate >= from && (!till || (till && cdate < till))) {
        this.allowNew = true;
      }
    }
  }

  ngOnInit() {
    this.yearsTabGroup.selectedIndex = this.Years.findIndex(
      o => o.title === this.consts.Year
    );
    this.monthsTabGroup.selectedIndex = this.Months.findIndex(
      o => o.title === this.consts.Month - 1
    );
    this.Companies = this.consts.Companies;
    if (this.consts.CompanyId) {
      this.companiesTabGroup.selectedIndex = this.Companies.findIndex(
        o => o.Id === this.consts.CompanyId
      );
    }
    if (!this.personId) {
      this.personId = this.consts.currentUserId.toString();
      this.isHalfTime = this.consts.currentUser.User.WorkType === 1;
    }
    this.refreshBeforeMonths();
    this.getItems(1);
    // this.onResize();
    if (this.personId !== this.consts.currentUserId.toString()) {
      this.datasource.getPersonById(this.personId).subscribe(d => {
        if (d && d.length > 0 && d[0].fullName) {
          this.fullname = d[0].fullName;
          this.isHalfTime = d[0].workType === 1;
        }
      });
      // this.datastore.findRecord(Person, this.personId, new HttpHeaders({})).subscribe(p => {
      //   if (p && p.fullName) {
      //     this.fullname = p.fullName;
      //   }
      // });
    }
  }

  refreshBeforeMonths() {
    const dt = this.cDate;
    this.beforeMonths = [];
    this.beforeMonths.push({
      title: format(addMonths(dt, -1), 'MMMM YYYY', { locale: ruLocale }),
      date: addMonths(dt, -1)
    });
    this.beforeMonths.push({
      title: format(addMonths(dt, -2), 'MMMM YYYY', { locale: ruLocale }),
      date: addMonths(dt, -2)
    });
    this.beforeMonths.push({
      title: format(addMonths(dt, -3), 'MMMM YYYY', { locale: ruLocale }),
      date: addMonths(dt, -3)
    });
  }

  onLazyLoad(event) {
    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    if (event.sortField) {
      this.sortProps = [
        (event.sortOrder === -1 ? '-' : '') +
          (event.sortField.startsWith('str')
            ? event.sortField.substring(3)
            : event.sortField)
      ];
    }
    this.getItems(event.first / event.rows + 1);
  }
  public deleteItem(item) {
    this.datastore.deleteRecord(this.getModel(), item.id).subscribe(() => {
      this.showToast('Элемент удален');
      this.getItems(this.page);
      // this.getItems(this.page);
    });
  }

  public setPage(pageInfo: { offset: number }) {
    this.getItems(pageInfo.offset + 1);
  }

  public onSort(event: { sorts: any[] }) {
    //  event was triggered, start sort sequence
    this.loading = true;
    //  emulate a server request with a timeout
    //  this is only for demo purposes, normally
    //  your server would return the result for
    //  you and you would just set the rows prop
    const sort = event.sorts[0];
    this.sortProps = [
      (sort.dir === 'desc' ? '-' : '') +
        (sort.prop.startsWith('str') ? sort.prop.substring(3) : sort.prop)
    ];
    this.getItems(this.page);
  }
  onActivate({ event }) {
    // console.log('Select Event', selected, this.selected);
    if (event.type === 'click') {
      console.log(event.row);
    }
  }
  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  add() {
    // console.log('add Event');
    if (this.tabelId) {
      this.addService(this.tabelId);
    } else {
      this.datastore.findRecord(Person, this.Person).subscribe(o1 => {
        this.datastore.findRecord(Company, this.Company).subscribe(o2 => {
          const dt = new Date(this.Year, this.Month);
          const tbl = this.datastore.createRecord(Tabel, {
            id: '',
            active: true,
            title: format(dt, 'YYYY_MM-' + this.Person, { locale: ruLocale }),
            year: this.Year,
            month: this.Month,
            date: format(dt, 'YYYY.MM.DD 00:00:00'),
            company: o2,
            person: o1
          });
          // tbl.person = this.datastore.peekRecord(Person, this.Person);
          // tbl.company = this.datastore.peekRecord(Company, this.Company);

          delete tbl.id;
          // { include: 'person,company' }
          tbl.save().subscribe(t => {
            // console.log(post);
            // this.router.navigate(['pages', 'companies', data.id]);
            this.addService(t.id);
          });
        });
      });
    }
  }
  private addService(tId, sId = null) {
    this.datasource.getPersonById(this.personId).subscribe(o => {
      if (o.length > 0) {
        const unitid = o[0].unitid;
        const dialogRef = this.dialog.open(ServicelineFormComponent, {
          width: '850px',
          data: { name: 'Диалог', tabelId: tId, serviceId: sId, unitId: unitid }
        });
        dialogRef.afterClosed().subscribe(result => {
          // console.log(`Dialog result: ${result}`); // Pizza!
          this.getItems(1);
        });
      }
    });
  }
  private addHours(sId, hId, date, hours = 0, maxValue) {
    const dialogRef = this.dialog.open(WsshourFormComponent, {
      width: '450px',
      data: {
        name: 'Диалог',
        serviceId: sId,
        hId: hId,
        date: date,
        hours: hours,
        maxValue: maxValue
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`); // Pizza!
      this.getItems(1);
    });
  }
  update() {
    console.log('update Event');
    if (this.selected.length !== 1) {
      return;
    }
    // this.router.navigate(['pages', this.getRouteName(), this.selected[0].id]);
    // this.router.navigate([this.selected[0].id], { relativeTo: this.route });
  }
  delete() {
    console.log('delete Event');
    if (this.selected.length === 0) {
      return;
    }
    if (confirm('Выбранные объекты будут удалены. Вы уверены?')) {
      this.selected.forEach(item => {
        this.deleteItem(item);
      });
    }
  }
  refresh() {
    this.getItems(this.page);
  }
  showToast(message: string, position = 'top-right', status = 'Success') {
    this.toastrService.info(message, `Информационное сообщение`);
  }
  sumByDay(cells) {
    const filteredCells = cells.filter(cell => !!cell);
    const summ = filteredCells.reduce((sum, cell) => (sum += cell), 0);
    // if (summ === '' || summ === 0) { return ''; }
    return summ;
  }
  getHeaderClassByDay(col) {
    if ((col.prop || '').indexOf('d_') !== -1) {
      const v = this.getSumByColumn(col);
      if (v === (this.isHalfTime ? 4 : 8)) {
        return 'day-timefill';
      }
    }
    return '';
  }
  getSumByColumn(col) {
    if (col.prop === 'summ') {
      return this.items.reduce((sum, cell) => (sum += cell.summ), 0);
    }
    if ((col.prop || '').indexOf('d_') !== -1) {
      return this.items.reduce((sum, cell) => (sum += cell[col.prop] || 0), 0);
    }
    return '';
  }
  getClassByDate(item, col) {
    if (col.prop.indexOf('d_') === -1) {
      return '';
    }
    const coldate = col.date;
    return this.getClassByColDate(coldate);
  }
  getClassByColDate(coldate: Date) {
    let weekend = false;
    if (this.userDays.length > 0) {
      for (let index = 0; index < this.userDays.length; index++) {
        const d = this.userDays[index];
        weekend = coldate.getDay() === 6 || coldate.getDay() === 0;
        if (weekend) {
          return 'day-nowork';
        }
        if (isWithinRange(coldate, d.dateFrom, d.dateTill)) {
          switch (d.dayType) {
            case 0:
              return 'day-businesstrip';
              break; // 'Командировка'
            case 1:
              return 'day-ill';
              break; // 'Болезнь';
            case 2:
              return 'day-holiday';
              break; // 'Отпуск';
            // case 3: return 'Другое'; break;
            default:
              // return 'Н/Д';
              break;
          }
        }
      }
    }
    if (this.workDays.length > 0) {
      for (let index = 0; index < this.workDays.length; index++) {
        const d = this.workDays[index];
        if (isEqual(coldate, d.date)) {
          switch (d.dayType) {
            case 0:
              return '';
              break;
            case 1:
              return 'day-nowork';
              break;
            case 2:
              return 'day-short';
              break;
            default:
              // return 'Н/Д';
              break;
          }
        }
      }
    }
    weekend = coldate.getDay() === 6 || coldate.getDay() === 0;
    if (weekend) {
      return 'day-nowork';
    }
    return '';
  }
  isDayShort(col){
    let shortday = false;
    if (this.workDays.length > 0) {
      const wdays = this.workDays.filter(d => +d.date - col.date === 0);
      if (wdays && wdays.length > 0 && wdays[0].dayType === 2) {
        shortday = true;
      }
    }
    return shortday;
  }
  cellClick(item, col) {
    if (!(this.tabel && !this.tabel.fill && !this.tabel.approve)) {
      alert('Ввод данных не доступен. Табель подтвержден/согласован.');
      return;
    }
    if (col.prop === 'summ') {
      return;
    }
    if (col.prop.indexOf('d_') === -1) {
      this.addService(this.tabelId, item.id);
      return;
    }
    let shortday = false;
    let workday = false;
    if (this.workDays.length > 0) {
      const wdays = this.workDays.filter(d => +d.date - col.date === 0);
      if (wdays && wdays.length > 0 && wdays[0].dayType === 1) {
        alert('Ввод данных не доступен. День указан как нерабочий.');
        return;
      }
      if (wdays && wdays.length > 0 && wdays[0].dayType === 2) {
        shortday = true;
      }
      if (wdays && wdays.length > 0 && wdays[0].dayType === 0) {
        workday = true;
      }
    }
    const weekend = col.date.getDay() === 6 || col.date.getDay() === 0;
    if (!workday && weekend) {
      alert('Ввод данных не доступен. День указан как нерабочий.');
      return;
    }

    const wdc = this.getClassByDate(item, col) || '';
    switch (wdc) {
      // 'Болезнь';
      case 'day-ill':
      // отпуск
      case 'day-holiday':
      // не рабочий
      case 'day-nowork':
        alert(
          'Ввод данных не доступен. День указан как Болезнь/Отпуск/Нерабочий.'
        );
        return;
        break;
      // 'Командировка'
      case 'day-businesstrip':
      default:
        break;
    }

    // проверка, что ввод на проект разрешен. Дата с и дата по в проекте
    if (item.project.dateFrom && col.date < new Date(item.project.dateFrom)) {
      alert(
        'Ввод данных на проект доступен с ' +
          format(item.project.dateFrom, 'DD.MM.YYYY', { locale: ruLocale })
      );
      return;
    }
    if (item.project.dateTill && new Date(item.project.dateTill) < col.date) {
      alert(
        'Ввод данных на проект доступен по ' +
          format(item.project.dateTill, 'DD.MM.YYYY', { locale: ruLocale })
      );
      return;
    }
    let sumByColumn = 0;
    const day = col.date.getDate();
    this.items.forEach(o => {
      sumByColumn += parseInt(o['d_' + day] || 0, 10);
    });
    // if (sumByColumn >= 8 || (shortday && sumByColumn >= 7)) {
    //   return;
    // }
    const cValue = this.getPropValue(item, col.prop) || 0;
    const timeToFill = this.isHalfTime ? (shortday ? 3 : 4) : (shortday ? 7 : 8);
    let maxValue = timeToFill - sumByColumn + cValue;
    if (maxValue === 0 && cValue === 0) {
      alert(
        'Ввод данных не доступен. Доступное время распределено на другие услуги.'
      );
      return;
    }
    if (cValue > 0 && cValue > maxValue) {
      maxValue = cValue;
    }
    const hTemp = (item.hours || []).filter(h => h.date - col.date === 0);
    this.addHours(
      item.id,
      hTemp && hTemp.length === 1 && hTemp[0].id ? hTemp[0].id : null,
      col.date,
      cValue,
      maxValue
    );
  }
  checkTabelBeforeFill() {
    let needToFill = 0;
    const dates = this.columns.filter(c => c['prop'].indexOf('d_') !== -1);
    dates.forEach(d => {
      const clByDate = this.getClassByColDate(d['date']);
      switch (clByDate) {
        case 'day-ill':
        // отпуск
        case 'day-holiday':
        // не рабочий
        case 'day-nowork':
          break;
        // 'Командировка'
        case 'day-businesstrip':
        default:
          needToFill += clByDate === 'day-short' ? (this.isHalfTime ? 3 : 7) : (this.isHalfTime ? 4 : 8);
          break;
      }
    });
    const currentSum = this.items.reduce((sum, cell) => (sum += cell.summ), 0);
    if (currentSum < needToFill) {
      return (
        'Нельзя подтвердить табель. Необходимо распределить ' +
        needToFill +
        ' часов. Распределено ' +
        currentSum +
        ' часов.'
      );
    }
    return '';
  }
  fill() {
    const errorMessage = this.consts.IsAdmin ? '' : this.checkTabelBeforeFill();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    if (
      this.tabelId &&
      confirm(
        'Табель будет подтвержден и закрыт для редактирования. Вы уверены?'
      )
    ) {
      this.datastore
        .findRecord(
          this.getModel(),
          this.tabelId,
          null,
          this.consts.noCacheHeaders
        )
        .subscribe(
          item => {
            item.fill = true;
            item.fillDate = new Date();
            item.save().subscribe(data => {
              this.showToast('Табель подтвержден и закрыт для редактирования.');
              // this.createMessage(
              // );
              // console.log(data);
              this.getItems(1);
            });
            // console.log('success alert', this.item);
          },
          error => {
            console.log('error controll', error);
          }
        );
    }
  }

  approve() {
    if (this.tabelId && confirm('Табель будет согласован. Вы уверены?')) {
      this.datastore
        .findRecord(
          this.getModel(),
          this.tabelId,
          null,
          this.consts.noCacheHeaders
        )
        .subscribe(
          item => {
            item.approver = this.datastore.peekRecord(Person, this.personId);
            item.approve = true;
            item.approveDate = new Date();
            item.save().subscribe(data => {
              this.showToast('Табель согласован.');
              this.createMessage(
                'Ваш табель за ' +
                  format(this.cDate, 'MM.YYYY') +
                  ' был согласован.',
                'Ваш табель за ' +
                  format(this.cDate, 'MM.YYYY') +
                  ' был согласован.'
              );
              // console.log(data);
              this.getItems(1);
            });
            // console.log('success alert', this.item);
          },
          error => {
            console.log('error controll', error);
          }
        );
    }
  }

  disapprove(msg) {
    if (msg && this.tabelId) {
      this.datastore
        .findRecord(
          this.getModel(),
          this.tabelId,
          null,
          this.consts.noCacheHeaders
        )
        .subscribe(
          item => {
            item.approver = this.datastore.peekRecord(Person, this.personId);
            item.fill = false;
            item.fillDate = new Date();
            item.approve = false;
            item.approveDate = new Date();
            item.save().subscribe(data => {
              this.showToast('Табель отклонен.');
              this.createMessage(
                'Ваш табель за ' +
                  format(this.cDate, 'MM.YYYY') +
                  ' был отклонен.',
                [
                  'Ваш табель за ' +
                    format(this.cDate, 'MM.YYYY') +
                    ' был отклонен.',
                  '',
                  'Причина отклонения: ',
                  msg
                ].join('<br/>')
              );
              // console.log(data);
              this.getItems(1);
            });
            // console.log('success alert', this.item);
          },
          error => {
            console.log('error controll', error);
          }
        );
    }
  }

  createMessage(subject, body) {
    body +=
      '<br/><a href=\'' +
      this.getOrigin() +
      '/pages/dashboard\'>Просмотреть табель</a>';
    body +=
      '<br/><hr><b style=font-weight:normal; font-size:12px;>Убедительная просьба не отвечать на данное сообщение</b>';
    /*
    {0} заполнил(а) табель за {1:MM.yyyy}
    Ваш табель за {0:MM.yyyy} был согласован.
    Ваш табель за {0:MM.yyyy} был отклонен.
    */
    const cPerson = this.datastore.peekRecord(Person, this.personId);
    const msg = this.datastore.createRecord(Message, {
      active: true,
      title: subject,
      body: body,
      person: cPerson,
      completed: false
    });
    // tbl.person = this.datastore.peekRecord(Person, this.Person);
    // tbl.company = this.datastore.peekRecord(Company, this.Company);

    delete msg.id;
    // { include: 'person,company' }
    msg.save().subscribe(t => {
      // console.log(post);
      // this.router.navigate(['pages', 'companies', data.id]);
    });
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, width = '550px') {
    const dialogRef = this.dialog.open(templateRef, {
      width: width
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if (this.disComment) {
        this.disapprove(this.disComment);
        this.disComment = null;
      } else if (this.beforeMonth) {
        this.beforeMonthServices = [];
        const d = new Date(this.beforeMonth);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const qByTabel = {
          page: { size: 1, number: 1 },
          include: 'services,services.service,services.project,services.client',
          filter: {
            'person.id': this.Person,
            'company.id': this.Company,
            year: y,
            month: m
          }
        };
        this.datastore
          .findAll(Tabel, qByTabel, this.consts.noCacheHeaders)
          .subscribe(r1 => {
            this.beforeMonth = null;
            const tabels = r1.getModels();
            if (tabels.length === 0) {
              return;
            }
            this.beforeMonthServices = tabels[0].services;
            this.openDialogWithTemplateRef(
              this.servicesInMonthDialog,
              '1000px'
            );
          });
      }
    });
  }

  openTabel() {
    if (
      this.tabelId &&
      confirm('Табель будет открыт для заполнения. Вы уверены?')
    ) {
      this.datastore
        .findRecord(
          this.getModel(),
          this.tabelId,
          null,
          this.consts.noCacheHeaders
        )
        .subscribe(
          item => {
            item.approver = this.datastore.peekRecord(Person, this.personId);
            item.fill = false;
            item.fillDate = new Date();
            item.approve = false;
            item.approveDate = new Date();
            item.save().subscribe(data => {
              this.showToast('Табель открыт для заполнения.');
              // this.createMessage(
              //   'Ваш табель за ' + format(this.cDate, 'MM.yyyy') + ' был отклонен.',
              //   'Ваш табель за ' + format(this.cDate, 'MM.yyyy') + ' был отклонен.',
              // );
              // console.log(data);
              this.getItems(1);
            });
            // console.log('success alert', this.item);
          },
          error => {
            console.log('error controll', error);
          }
        );
    }
  }

  getOrigin() {
    if (!window.location.origin) {
      return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '')
      );
    }
    return window.location.origin;
  }
  onRowChanged(id) {
    const ind = this.beforeMonthServiceIds.findIndex(o => o === id);
    if (ind === -1) {
      this.beforeMonthServiceIds.push(id);
    } else {
      // this.beforeMonthServiceIds =
      this.beforeMonthServiceIds.splice(ind, 1);
    }
  }

  copyServices() {
    if (this.beforeMonthServiceIds.length > 0) {
      const qByService = {
        page: { size: this.beforeMonthServiceIds.length, number: 1 },
        include: 'tabel,project,client',
        filter: {
          id: 'in:' + this.beforeMonthServiceIds.join(',')
        }
      };
      this.datastore
        .findAll(Serviceline, qByService, this.consts.noCacheHeaders)
        .subscribe(r1 => {
          const items = r1.getModels();
          this.workWithServices(items);
        });
    }
  }

  workWithServices(items: Serviceline[], ind = 0) {
    if (items.length === 0 || ind >= items.length) {
      this.beforeMonthServiceIds = [];
      this.beforeMonthServices = [];
      this.getItems(1);
      return;
    }

    const o = items[ind];
    const s = this.datastore.createRecord(Serviceline, {
      id: '',
      active: true,
      client: o.client,
      project: o.project,
      service: o.service,
      result: o.result,
      tabel: this.tabel
    });
    delete s.id;
    // { include: 'person,company' }
    s.save().subscribe(t => {
      // console.log(post);
      // this.router.navigate(['pages', 'companies', data.id]);
      ind++;
      this.workWithServices(items, ind);
    });
  }
}
