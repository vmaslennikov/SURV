import { ModelType, JsonApiQueryData } from 'angular2-jsonapi';

import { Workday } from '../../../shared/Models/workday';
import { Router, ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';
import { ToastrService } from 'ngx-toastr';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { addDays, addMonths, format, getDaysInMonth, isSameWeek, isEqual, isWithinRange, parse, addYears } from 'date-fns';
import { MatTabGroup, MatDialog } from '@angular/material';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { WorkdayFormComponent } from './workday.component';
import { Hryear } from 'src/app/shared/Models/hryear';
import { Person } from 'src/app/shared/Models/person';
import { Hrmonth } from 'src/app/shared/Models/hrmonth';

@Component({
  selector: 'app-ngx-dayscalendar',
  styles: [
    `
      .flexdays {
        display: flex;
      }
      .flexmonths {
        display: flex;
        flex-wrap: wrap;
      }
      .calendarcontainer {
        margin: auto;
        padding: 15px;
      }
      .col-calendar {
        min-width: 250px;
      }
      .monthcontainer {
        width: 245px;
        margin: auto auto 25px;
        background: #fff;
        padding: 10px;
        min-height: 293px;
      }
      .haveevents {
        background: linear-gradient(120deg, var(--primary), #fff);
        color: var(--textcolor);
      }
      .flexdays .day {
        padding: 2px;
        width: 28px !important;
        height: 28px !important;
        border-radius: 50%;
        margin: 2px;
        text-align: center;
      }
      .flexdays .day:hover,
      .yeardayactive {
        background: #eee;
        cursor: pointer;
      }
      .monthname {
        text-align: center;
        font-size: 18px;
        color: var(--themecolor);
        text-transform: capitalize;
      }
      .title-calendar-year {
        margin-bottom: 25px;
      }
      .todayclass {
        background: var(--themecolor) !important;
        color: #fff;
      }
      .eventclass {
        background: #4ab3cc !important;
        color: #fff;
      }
      .todaytext {
        color: var(--themecolor) !important;
      }
      .eventtext {
        color: #4ab3cc !important;
      }
      .void_day {
        pointer-events: none;
      }
      .pop_year_day {
        color: #6c6c6c;
        font-size: 16px;
      }
      .pop_year_day_number {
        font-size: 38px;
        color: #b3b3b3;
        margin-left: 6px;
        margin-top: -15px;
      }
      .circle_day_color {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        float: left;
        margin-right: 6px;
        margin-top: 5px;
        border: 1px solid;
      }
      .pop_year_event_title {
        width: 200px;
        color: #b7b7b6;
        margin-top: -8px;
      }
      .progressbar_popyear {
        width: 200px;
        padding: 13px 0;
      }
      .pop_year_event_title:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      .icon-action-calendar {
        float: right;
        color: #8a8989 !important;
        cursor: pointer;
      }
      .icon-action-calendar:hover {
        opacity: 0.4;
      }
      .calendar-loading .spinner {
        height: 200px;
        width: 200px;
        -webkit-animation: 2s linear infinite rotate;
        animation: 2s linear infinite rotate;
        -webkit-transform-origin: center center;
        transform-origin: center center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
      .calendar-loading .spinner .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        -webkit-animation: 1.5s ease-in-out infinite dash;
        animation: 1.5s ease-in-out infinite dash;
        stroke-linecap: round;
        stroke: var(--themecolor);
      }
      @-webkit-keyframes rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes rotate {
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @-webkit-keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
      .loader_popover_calendar {
        height: 6px;
        width: 90%;
        margin-bottom: 10px;
        overflow: hidden;
        background-color: #ffdede00;
        position: absolute;
      }
      .loader_popover_calendar:before {
        display: block;
        position: absolute;
        content: \"\";
        left: -20px;
        width: 20px;
        height: 4px;
        background-color: var(--themecolor);
        -webkit-animation: 1s linear infinite loading;
        animation: 1s linear infinite loading;
      }
      @-webkit-keyframes loading {
        from {
          left: -20px;
          width: 30%;
        }
        50% {
          width: 30%;
        }
        70% {
          width: 70%;
        }
        80% {
          left: 50%;
        }
        95% {
          left: 120%;
        }
        to {
          left: 100%;
        }
      }
      @keyframes loading {
        from {
          left: -20px;
          width: 30%;
        }
        50% {
          width: 30%;
        }
        70% {
          width: 70%;
        }
        80% {
          left: 50%;
        }
        95% {
          left: 120%;
        }
        to {
          left: 100%;
        }
      }
      .titles_calendar {
        font-weight: 700;
        text-transform: capitalize;
      }
      .responsivecontainer {
        width: 25%;
      }
      @media screen and (max-width: 499px) {
        .responsivecontainer {
          width: 100% !important;
        }
      }
      @media screen and (min-width: 500px) and (max-width: 749px) {
        .responsivecontainer {
          width: 50% !important;
        }
      }
      @media screen and (min-width: 750px) and (max-width: 999px) {
        .responsivecontainer {
          width: 33% !important;
        }
      }
      @media screen and (min-width: 1000px) {
        .responsivecontainer {
          width: 25% !important;
        }
      }
    `
  ],
  template: `
    <div class="">
      <div class="row">
        <div class="col-md-10">
          <mat-tab-group #yearsTabGroup md-stretch-tabs (selectedIndexChange)="setYear($event)">
            <mat-tab *ngFor="let tab of Years" label="{{ tab.title }}"> </mat-tab>
          </mat-tab-group>
        </div>
        <div class="col-md-2">
          <button mat-icon-button (click)="approveYear()" title="Подтвердить год" *ngIf="!yearApproved">
            <mat-icon>check_circle_outline</mat-icon>
          </button>
          <button mat-icon-button (click)="clearYear()" title="Удалить подтверждение года" *ngIf="yearApproved">
            <mat-icon>delete_outline</mat-icon>
          </button>
        </div>
      </div>

      <div class="calendarcontainer flexmonths">
        <div class="responsivecontainer" *ngFor="let Month of calendar; let m = index">
          <div class="monthcontainer ">
            <p class="monthname">
              {{ Month.name }}

              <button mat-icon-button *ngIf="!Month.monthApproved" (click)="approveMonth(m)" title="Подтвердить месяц">
                <mat-icon>check_circle_outline</mat-icon>
              </button>
              <button mat-icon-button *ngIf="Month.monthApproved" (click)="clearMonth(m)" title="Удалить подтверждение месяца">
                <mat-icon>delete_outline</mat-icon>
              </button>
            </p>
            <div class="flexdays">
              <div class="day" *ngFor="let label of days">
                {{ label }}
              </div>
            </div>
            <div *ngFor="let week of Month.days" class="flexdays">
              <div
                *ngFor="let day of week; let i = index"
                [ngClass]="day ? (day.istoday ? 'todayclass' : day.nb > 0 ? 'haveevents' : '') : 'void_day'"
                [style.background-image]="day ? 'linear-gradient(120deg, ' + day.colors + ',' + day.colors + ')' : ''"
                class="day"
                placement="right"
                (click)="dayClickedFn(day, m)"
              >
                {{ day?.day }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="spinner" class="calendar-loading">
        <svg class="spinner" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
        </svg>
      </div>
    </div>
  `
})
export class YearCalendarComponent implements OnInit {
  allowNew: boolean = this.consts.IsHr || this.consts.IsAdmin;
  allowEdit: boolean = this.consts.IsHr || this.consts.IsAdmin;
  allowDelete: boolean = this.consts.IsHr || this.consts.IsAdmin;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public datastore: Datastore,
    public toastrService: ToastrService,
    public consts: ConstsService,
    public dialog: MatDialog
  ) {
    route.queryParams.subscribe(({ page }) => {
      // this.getItems(parseInt(page, 10) || 1);
    });
  }

  nothingToshowText: any = 'Нет событий'; // "By default" => There are no events scheduled that day.
  colors: any = {
    red: {
      primary: '#ebebeb', // '#ad2121', // '#ad2121'
      secondary: '#ebebeb' // '#ad2121'
    },
    yellow: {
      primary: '#fcf3ca',
      secondary: '#fcf3ca'
    },
    green: {
      primary: '#ff',
      secondary: '#ff'
    }
  };
  days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  calendar = [];
  spinner = true;
  yearApproved = false;
  events: any = [];
  viewDate: Date = new Date();
  themecolor: any = '#0a5ab3';

  Months: any[] = Array.from({ length: 12 }, (x, i) => {
    return {
      title: i,
      // active: i == (this.consts.Month - 1),
      name: format(new Date(this.Year, i), 'MMMM', { locale: ruLocale })
    };
  });

  get Year() {
    return this.consts.Year;
  }
  @ViewChild('yearsTabGroup') yearsTabGroup: MatTabGroup;

  Years: any[] = Array.from({ length: 12 }, (x, i) => {
    const temp = 2010 + i;
    return { title: temp, active: temp === this.consts.Year };
  });
  setYear(index: number) {
    this.consts.Year = this.Years[index].title;
    this.getItems();
  }
  ngOnInit() {
    const ind = this.Years.findIndex(o => o.active);
    this.yearsTabGroup.selectedIndex = ind;
    this.setYear(ind);
  }

  getItems() {
    const dt = new Date(this.Year, 0);
    this.viewDate = dt;
    const qByWorkDays = {
      page: { size: 1000, number: 1 },
      sort: ['date'],
      filter: {
        date: ['ge:' + format(dt, 'YYYY.MM.DD'), 'lt:' + format(addYears(dt, 1), 'YYYY.MM.DD')]
      }
    };
    this.datastore.findAll(Workday, qByWorkDays, this.consts.noCacheHeaders).subscribe(r2 => {
      this.events = [];
      const temp = r2.getModels();
      temp.forEach(d => {
        let c = this.colors.green;
        switch (d.dayType) {
          case 0:
            c = this.colors.green;
            break;
          case 1:
            c = this.colors.red;
            break;
          case 2:
            c = this.colors.yellow;
            break;
          default:
            break;
        }
        this.events.push({
          id: d.id,
          start: d.date,
          end: d.date,
          title: format(d.date, 'YYYY.MM.DD'),
          color: c
          // actions: this.actions
        });
      });
      for (let index = 0; true; index++) {
        const d = addDays(dt, index);
        if (d.getFullYear() !== dt.getFullYear()) {
          break;
        }
        if (d.getDay() === 6 || d.getDay() === 0) {
          if (this.events.filter(o => o.start === d).length === 0) {
            this.events.push({
              start: d,
              end: d,
              title: format(d, 'YYYY.MM.DD'),
              color: this.colors.red
            });
          }
        }
      }
      this.initCalendar();
    });

    const qYear = {
      page: { size: 1, number: 1 },
      filter: { date: new Date(this.Year, 0, 1, 0, 0, 0) }
    };
    this.datastore.findAll(Hryear, qYear, this.consts.noCacheHeaders).subscribe((data: JsonApiQueryData<Hryear>) => {
      this.yearApproved = data.getModels().length > 0;
    });
  }

  getModel(): ModelType<Workday> {
    return Workday;
  }

  initCalendar() {
    this.calendar = [];
    this.spinner = true;
    const dt = new Date(this.Year, 0);
    const qByHrDays = {
      page: { size: 100, number: 1 },
      sort: ['date'],
      filter: {
        date: ['ge:' + format(dt, 'YYYY.MM.DD'), 'lt:' + format(addYears(dt, 1), 'YYYY.MM.DD')]
      }
    };
    this.datastore.findAll(Hrmonth, qByHrDays, this.consts.noCacheHeaders).subscribe(r2 => {
      const mnths = r2.getModels();
      for (let index = 0; index < 12; index++) {
        const d = new Date(this.Year, index);
        const hasMonth = mnths.filter(o => isEqual(d, o.date)).length > 0;
        this.calendar.push({
          date: new Date(this.Year, index, 0),
          name: format(new Date(this.Year, index), 'MMMM', { locale: ruLocale }),
          days: this.generateCalendar(index, this.Year),
          monthApproved: hasMonth
        });
      }
    });

    // this.days = [];
    // const dayone = new Date(this.Year, 0, 0).getDay();
    // for (let index = dayone; index < dayone + 7; index++) {
    //   this.days.push(new Date(this.Year, 1, index));
    // }
    // const self = this;
    // setTimeout(() => {
    //   self.spinner = false;
    // }, 2000);
  }

  getnbevents(day, month) {
    let nb = 0;
    const colors = [];
    if (this.events.length > 0) {
      const d1 = new Date(this.Year, month, day).toDateString();
      for (let index = 0; index < this.events.length; index++) {
        const element = this.events[index];
        const d2 = element.start.toDateString();
        if (d2 === d1) {
          nb++;
          colors.push(element.color.secondary);
        }
      }
      return { nb: nb, color: colors.toString() };
    } else {
      return { color: '', nb: 0 };
    }
  }

  generateCalendar(month, year) {
    const monthList = [];
    let d = new Date(year, month);
    let prev = null;
    let weekIndex = 0;
    monthList[weekIndex] = [];
    while (d.getMonth() === month) {
      if (prev != null && !isSameWeek(prev, d, { weekStartsOn: 1 })) {
        weekIndex++;
        monthList[weekIndex] = [];
      }
      const dayNumber = (d.getDay() === 0 ? 7 : d.getDay()) - 1;
      const day = d.getDate();
      const colorsEvents = this.getnbevents(day, month);
      monthList[weekIndex][dayNumber] = {
        day: day,
        istoday: false,
        colors: colorsEvents.color,
        events: [],
        nb: colorsEvents.nb
      };
      prev = d;
      d = addDays(d, 1);
    }
    return monthList;
  }

  dayClickedFn(day, month) {
    const date = new Date(this.Year, month, day.day);
    const e = this.events.filter(o => isEqual(o.start, date));
    // if ((e && e.length > 0)) {// || [0, 6].indexOf(date.getDay()) === -1
    const dialogRef = this.dialog.open(WorkdayFormComponent, {
      width: '850px',
      data: {
        name: 'Диалог',
        workdayId: e && e.length > 0 && e[0].id ? e[0].id : 'new',
        date: format(date, 'YYYY-MM-DD')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`); // Pizza!
      this.getItems();
    });
    // }
  }

  approveYear() {
    if (this.Year) {
      const qYear = {
        page: { size: 1, number: 1 },
        filter: { date: new Date(this.Year, 0, 1, 0, 0, 0) }
      };
      this.datastore.findAll(Hryear, qYear, this.consts.noCacheHeaders).subscribe((data: JsonApiQueryData<Hryear>) => {
        const items = data.getModels();
        let item = null;
        if (items.length === 0) {
          item = this.datastore.createRecord(Hryear);
          item.date = new Date(this.Year, 0, 1, 0, 0, 0);
          item.title = format(item.date, 'YYYY год', { locale: ruLocale });
        } else {
          item = items[0];
          if (!item.title) {
            item.title = format(item.date, 'YYYY год', { locale: ruLocale });
          }
        }

        item.active = true;
        item.approveDate = new Date();
        this.datastore.findRecord(Person, this.consts.currentUserId.toString(), {}).subscribe((p: Person) => {
          item.approveperson = this.datastore.peekRecord(Person, this.consts.currentUserId.toString());
          item.save({ include: 'approveperson' }).subscribe(data2 => {
            // this.yearNeedApprove = false;
            // console.log(post);
            this.showToast('Год подтвержден.');
          });
        });
      });
    }
  }
  clearYear() {
    if (this.Year && confirm('Подтверждение года будет удалено. Вы уверены?')) {
      const qYear = {
        page: { size: 1, number: 1 },
        filter: { date: new Date(this.Year, 0, 1, 0, 0, 0) }
      };
      this.datastore.findAll(Hryear, qYear, this.consts.noCacheHeaders).subscribe((data: JsonApiQueryData<Hryear>) => {
        const items = data.getModels();
        if (items.length > 0) {
          const item = items[0];
          this.datastore.deleteRecord(Hryear, item.id).subscribe(r => {
            this.showToast('Подтверждение года удалено.');
            this.getItems();
          });
        }
      });
    }
  }
  approveMonth(m) {
    if (m >= 0 && confirm('Месяц будет подтвержден. Вы уверены?')) {
      const qMonth = {
        page: { size: 1, number: 1 },
        filter: { date: new Date(this.Year, m) }
      };
      this.datastore.findAll(Hrmonth, qMonth, this.consts.noCacheHeaders).subscribe((data: JsonApiQueryData<Hrmonth>) => {
        const items = data.getModels();
        let item = null;
        if (items.length === 0) {
          item = this.datastore.createRecord(Hrmonth);
          item.date = new Date(this.Year, m);
          item.title = format(item.date, 'MMMM YYYY', { locale: ruLocale });
        } else {
          item = items[0];
          if (!item.title) {
            item.title = format(item.date, 'MMMM YYYY', { locale: ruLocale });
          }
        }

        item.active = true;
        item.approveDate = new Date();
        this.datastore.findRecord(Person, this.consts.currentUserId.toString(), {}).subscribe((p: Person) => {
          item.approveperson = this.datastore.peekRecord(Person, this.consts.currentUserId.toString());
          item.save({ include: 'approveperson' }).subscribe(data2 => {
            // this.yearNeedApprove = false;
            // console.log(post);
            this.showToast('Месяц подтвержден.');
            this.getItems();
          });
        });
      });
    }
  }
  clearMonth(m) {
    if (m >= 0 && confirm('Подтверждение месяца будет удалено. Вы уверены?')) {
      const qMonth = {
        page: { size: 1, number: 1 },
        filter: { date: new Date(this.Year, m) }
      };
      this.datastore.findAll(Hrmonth, qMonth).subscribe((data: JsonApiQueryData<Hrmonth>) => {
        const items = data.getModels();
        if (items.length > 0) {
          const item = items[0];
          this.datastore.deleteRecord(Hrmonth, item.id, this.consts.noCacheHeaders).subscribe(r => {
            this.showToast('Подтверждение месяца удалено.');
            this.getItems();
          });
        }
      });
    }
  }
  showToast(message: string, position = 'top-right', status = 'Success') {
    this.toastrService.info(message, `Информационное сообщение`);
  }
}
