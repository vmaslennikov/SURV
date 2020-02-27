import { PmByServiceComponent } from './pmbyservice.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';
import { DatasourcesService } from 'src/app/shared/services/datasources.service';
import { ToastrService } from 'ngx-toastr';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { MatDialog, MatTabGroup } from '@angular/material';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { addDays, addMonths, format, getDaysInMonth, isEqual, isWithinRange, parse } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ngx-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {
  get Year() {
    return this.consts.Year;
  }
  get Month() {
    return this.consts.Month;
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public datastore: Datastore,
    public datasource: DatasourcesService,
    public toastrService: ToastrService,
    public consts: ConstsService,
    public dialog: MatDialog,
    public dateFns: DateFnsConfigurationService,
    public http: HttpClient
  ) {}
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
      name: format(new Date(this.Year, i), 'MMMM', { locale: ruLocale })
    };
  });
  ProjectsData: [];
  displayedColumns: string[] = ['PersonName', 'Sum'];
  setYear(index: number) {
    this.consts.Year = this.Years[index].title;
    this.getItems();
  }
  setMonth(index: number) {
    this.consts.Month = parseInt(this.Months[index].title, 10) + 1;
    this.getItems();
  }
  ngOnInit() {
    this.yearsTabGroup.selectedIndex = this.Years.findIndex(o => o.title === this.consts.Year);
    this.monthsTabGroup.selectedIndex = this.Months.findIndex(o => o.title === this.consts.Month - 1);
    this.getItems();
  }

  getItems() {
    const url = 'api/projectsdata/byprojectperson?year=' + this.Year + '&month=' + this.Month;
    this.http.get(url).subscribe((data: any) => {
      this.ProjectsData = [];
      if (data && data.Items && data.Items.length > 0) {
        this.ProjectsData = data.Items;
      }
    });

    // .pipe(
    //   map((items: any) => {
    //     this.ProjectsData = [];
    //     if (items && items.length > 0) {
    //       this.ProjectsData = items;
    //     }
    //   }),
    //   catchError((err) => {
    //     return [];
    //   }));
  }

  showByService(project) {
    if (project && project.projectId) {
      const url = 'api/projectsdata/byprojectpersonservice?projectId=' + project.projectId + '&year=' + this.Year + '&month=' + this.Month;
      this.http.get(url).subscribe((data: any) => {
        if (data && data.Items && data.Items.length > 0) {
          const dialogRef = this.dialog.open(PmByServiceComponent, {
            width: '1240px',
            data: {
              name: 'Диалог',
              projectId: project.projectId,
              projectTitle: project.projectTitle,
              year: this.Year,
              month: this.Month,
              data: data.Items
            }
          });
        }
      });
    }
  }
}
