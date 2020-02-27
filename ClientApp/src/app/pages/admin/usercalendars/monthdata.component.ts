import { UsercalendarFormComponent } from './usercalendar.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';
import { DatasourcesService } from 'src/app/shared/services/datasources.service';
import { ToastrService } from 'ngx-toastr';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { MatDialog, MatTabGroup } from '@angular/material';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { addDays, addMonths, format, getDaysInMonth, isEqual, isWithinRange, parse } from 'date-fns';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { Usercalendar } from 'src/app/shared/Models/usercalendar';
import { Workday } from 'src/app/shared/Models/workday';
@Component({
  selector: 'app-monthdata',
  template: `
    <div>
      <div class="row">
        <div class="col-md-10">
          <mat-tab-group #yearsTabGroup md-stretch-tabs (selectedIndexChange)="setYear($event)" id="tblyears">
            <mat-tab *ngFor="let tab of Years" label="{{ tab.title }}"> </mat-tab>
          </mat-tab-group>
          <mat-tab-group #monthsTabGroup md-stretch-tabs (selectedIndexChange)="setMonth($event)">
            <mat-tab *ngFor="let tab of Months" label="{{ tab.name }}"> </mat-tab>
          </mat-tab-group>
        </div>

        <div class="col-md-2">
          <div class="">
            <div style="display:inline-block;WIDTH: 20px; BACKGROUND: #ebebeb; HEIGHT: 20px">&nbsp;</div>
            <span style="TEXT-ALIGN: left">- Нерабочий день</span>
          </div>
          <div class="">
            <div style="display:inline-block;WIDTH: 20px; BACKGROUND: #fcf3ca; HEIGHT: 20px">&nbsp;</div>
            <span style="TEXT-ALIGN: left">- Короткий день</span>
          </div>
          <div class="">
            <div style="display:inline-block;WIDTH: 20px; BACKGROUND: #d8ffcc; HEIGHT: 20px">&nbsp;</div>
            <span style="TEXT-ALIGN: left">- Отпуск</span>
          </div>
          <div class="">
            <div style="display:inline-block;WIDTH: 20px; BACKGROUND: #e8c0c0; HEIGHT: 20px">&nbsp;</div>
            <span style="TEXT-ALIGN: left">- Больничный</span>
          </div>
          <div class="">
            <div style="display:inline-block;WIDTH: 20px; BACKGROUND: #caecfc; HEIGHT: 20px">&nbsp;</div>
            <span style="TEXT-ALIGN: left">- Командировка</span>
          </div>
        </div>
      </div>

      <div class="">

      <p-table #pTable [value]="items" [loading]="loading" [lazy]="true"
        [resizableColumns]="false" [scrollable]="true" [columns]="columns" dataKey="personId">

        <ng-template pTemplate="colgroup" let-columns>
          <colgroup>
            <col *ngFor="let col of columns" [style.width]="col.width" class="{{col.cellClass}}">
          </colgroup>
        </ng-template>

        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns" class="{{col.headerClass}}">{{col.name}}</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-item>
          <tr class="tr-small">
            <td
            *ngFor="let col of columns"
            (click)="cellClick(item, col)"
            class="{{getClassByDate(item, col)}} {{col.cellClass}}">{{getPropValue(item,col.prop)}}</td>
          </tr>
        </ng-template>

      </p-table>

      </div>

    </div>
  `,
  styles: [`
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 70px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-table .ui-table-thead > tr > th {
                top: 100px;
            }
        }
  `]
})
export class MonthdataComponent implements OnInit {
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
    // route.params.subscribe(({ id }) => {
    // });
  }

  get Year() {
    return this.consts.Year;
  }
  get Month() {
    return this.consts.Month;
  }
  @ViewChild('yearsTabGroup') yearsTabGroup: MatTabGroup;
  @ViewChild('monthsTabGroup') monthsTabGroup: MatTabGroup;
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

  items: any[] = [];
  total_records = 0;
  columns: Array<object> = this.getColumns();
  loading = false;
  userDays: Array<Usercalendar> = [];
  workDays: Array<Workday> = [];
  @ViewChild('#pTable') pTable;

  ngOnInit(): void {
    this.yearsTabGroup.selectedIndex = this.Years.findIndex(o => o.title === this.consts.Year);
    this.monthsTabGroup.selectedIndex = this.Months.findIndex(o => o.title === this.consts.Month - 1);
    this.getItems();
  }
  setYear(index: number) {
    this.consts.Year = this.Years[index].title;
    this.getItems();
  }
  setMonth(index: number) {
    this.consts.Month = parseInt(this.Months[index].title, 10) + 1;
    this.getItems();
  }
  get DaysInMonth() {
    return getDaysInMonth(this.cDate);
  }
  get cDate() {
    return new Date(this.Year, this.Month - 1);
  }
  getItems() {
    this.items = [];
    const dt = this.cDate;
    this.columns = this.getColumns();
    const qByUserDays = {
      page: { size: 1000, number: 1 },
      sort: ['person.fullName'],
      filter: {
        // dateFrom: ['ge:' + format(dt, 'YYYY.MM.DD'), 'le:' + format(addMonths(dt, 1), 'YYYY.MM.DD')],
        // dateTill: ['ge:' + format(dt, 'YYYY.MM.DD'), 'le:' + format(addMonths(dt, 1), 'YYYY.MM.DD')],
        dateFrom: ['le:' + format(addMonths(dt, 1), 'YYYY.MM.DD')],
        dateTill: ['ge:' + format(dt, 'YYYY.MM.DD')]
      },
      include: 'person'
    };
    const qByWorkDays = {
      page: { size: 100, number: 1 },
      sort: ['date'],
      filter: {
        date: ['ge:' + format(dt, 'YYYY.MM.DD'), 'le:' + format(addMonths(dt, 1), 'YYYY.MM.DD')]
      }
    };
    this.datastore.findAll(Workday, qByWorkDays, this.consts.noCacheHeaders).subscribe(r1 => {
      this.workDays = r1.getModels();
      this.datastore.findAll(Usercalendar, qByUserDays, this.consts.noCacheHeaders).subscribe(r2 => {
        const uniquePersons = [];
        this.userDays = r2.getModels();
        this.userDays.forEach(o => {
          if (uniquePersons.findIndex(u => u === o.person.id) === -1) {
            uniquePersons.push(o.person.id);
          }
        });
        this.total_records = uniquePersons.length;
        const result = [];
        uniquePersons.forEach((pId, i) => {
          const events = this.userDays.filter(o => o.person.id === pId);
          if (events.length > 0) {
            const item = {
              index: i + 1,
              personId: events[0].person.id,
              person: events[0].person.fullName
            };
            for (let d = 1, l = this.DaysInMonth; d <= l; d++) {
              item['d_' + d] = '';
            }
            this.items.push(item);
          }
        });
      });
    });
  }

  getColumns(): Array<object> {
    const columns = [];
    columns.push({
      name: '№ п/п',
      prop: 'index',
      width: '30px',
      cellClass: 'va-top',
      resizeable: false,
      sortable: false,
      draggable: false
      // , headerClass: 'cellShort', cellClass: 'cellShort'
    });

    columns.push({
      name: 'Сотрудник',
      prop: 'person',
      minWidth: '140',
      cellClass: 'va-top'
      // , headerClass: 'cellShort', cellClass: 'cellShort'
    });

    const start = this.cDate;
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
      });
    }
    return columns;
  }
  getPropValue(obj, propName: string) {
    if (obj && propName) {
      const props = propName.split('.');
      if (props.length > 1) {
        return this.getPropValue(obj[props[0]], props.slice(1, props.length).join('.'));
      }
      return obj[props[0]];
    }
    return null;
  }
  getClassByDate(item, col) {
    if (col.prop.indexOf('d_') === -1) {
      return '';
    }
    const coldate = col.date;
    return this.getClassByColDate(coldate, item['personId']);
  }
  getClassByColDate(coldate: Date, personId) {
    let weekend = false;
    const userDaysByPerson = this.userDays.filter(o => o.person.id === personId);
    if (userDaysByPerson.length > 0) {
      for (let index = 0; index < userDaysByPerson.length; index++) {
        const d = userDaysByPerson[index];
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

  cellClick(item, col) {
    if (col.prop.indexOf('d_') === -1) {
      return;
    }
    if (this.userDays.length > 0) {
      const udays = this.userDays.filter(d => d.person.id === item.personId && isWithinRange(col.date, d.dateFrom, d.dateTill));
      if (udays && udays.length > 0) {
        const dialogRef = this.dialog.open(UsercalendarFormComponent, {
          width: '450px',
          data: {
            name: 'Диалог',
            Id: udays[0].id
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getItems();
        });
      }
    }
  }
}
