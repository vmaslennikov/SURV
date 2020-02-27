import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { format } from 'date-fns';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/shared/Models/company';
import { Serviceline } from 'src/app/shared/Models/serviceline';
import { Tabel } from 'src/app/shared/Models/tabel';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { Datastore } from 'src/app/shared/services/datastore.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  get Year() { return this.consts.Year; }
  get Month() { return this.consts.Month; }
  get Company() { return this.consts.CompanyId; }
  get Person() { return this.personId; }

  constructor(
    public  router: Router,
    public  route: ActivatedRoute,
    public  datastore: Datastore,
    public  toastrService: ToastrService,
    public  consts: ConstsService,
    public  dialog: MatDialog,
    public  dateFns: DateFnsConfigurationService,
  ) {

  }
  @Input() public personId: string;
  @ViewChild('yearsTabGroup') yearsTabGroup: MatTabGroup;
  @ViewChild('monthsTabGroup') monthsTabGroup: MatTabGroup;
  @ViewChild('companiesTabGroup') companiesTabGroup: MatTabGroup;
  @ViewChild('chart01') public chart01: BaseChartDirective;
  @ViewChild('chart02') public chart02: BaseChartDirective;

  Years: any[] = Array.from({ length: 12 }, (x, i) => {
    const temp = (2010 + i);
    return { title: temp, active: temp === this.consts.Year };
  });
  Months: any[] = Array.from({ length: 12 }, (x, i) => {
    return {
      title: i,
      // active: i == (this.consts.Month - 1),
      name: format(new Date(this.Year, i), 'MMMM', { locale: ruLocale })
    };
  });
  Companies: Company[];
  items: any[] = [];
  byClient: any[] = [];
  byProject: any[] = [];

  // Pie

  public colors = [ {
    backgroundColor: [
      '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085',
      '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22',
      '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b',
      '#bdc3c7', '#7f8c8d'
    ]
  }];
  public pieChart01Labels: string[] = [];
  public pieChart01Data: number[] = [];
  public pieChart01Type: string;

  public pieChart02Labels: string[] = [];
  public pieChart02Data: number[] = [];
  public pieChart02Type: string;

  public pieChartOptions: any = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };

  ngOnInit() {
    this.yearsTabGroup.selectedIndex = this.Years.findIndex(o => o.title === this.consts.Year);
    this.monthsTabGroup.selectedIndex = this.Months.findIndex(o => o.title === (this.consts.Month - 1));
    this.Companies = this.consts.Companies;
    if (this.consts.CompanyId) {
      this.companiesTabGroup.selectedIndex = this.Companies.findIndex(o => o.Id === this.consts.CompanyId);
    }
    if (!this.personId) {
      this.personId = this.consts.currentUserId.toString();
    }
    this.getItems(1);
  }

  setYear(index: number) {
    this.consts.Year = this.Years[index].title;
    this.getItems(1);
  }
  setMonth(index: number) {
    this.consts.Month = parseInt(this.Months[index].title, 10) + 1;
    this.getItems(1);
  }
  setCompany(index: number) {
    this.consts.CompanyId = this.Companies[index].Id;
    this.getItems(1);
  }
  getModel(): any { return Serviceline; }

  getQueryParams(page: number): any {
    return {
      sort: ['client.title', 'project.title'],
      page: { size: 1000, number: 1 },
    };
  }
  clearPies() {
    this.items = [];
    this.byProject = null;
    this.byClient  = null;

    this.pieChart01Labels.length = 0;
    this.pieChart01Data.length = 0;
    this.pieChart02Labels.length = 0;
    this.pieChart02Data.length = 0;
  }
  getItems(page: number) {
    this.clearPies();
    const dt = new Date(this.Year, this.Month - 1);
    const qByTabels = {
      // sort: ['services.client.title', 'services.project.title'],
      page: { size: 1000, number: 1 },
      include: 'services,services.service,services.client,services.project,services.hours',
      filter: {
        'company.id': this.Company,
        'person.id': this.Person,
        'year': this.Year,
        'month': this.Month,
      }
      // &filter[company.id]=eq:1&filter[person.id]=eq:232&filter[year]=eq:2012&filter[month]=eq:10&
    };

    this.datastore.findAll(Tabel, qByTabels, this.consts.noCacheHeaders)
      .subscribe(
        (items: JsonApiQueryData<Tabel>) => {
          const tabels = items.getModels();
          this.byProject = [];
          this.byClient  = [];
          if (tabels && tabels.length > 0) {
            tabels.forEach(item => {
              const services = (item.services || []);
              services.forEach(s => {
                const hours = (s.hours || []);
                for (let index = hours.length - 1; index >= 0; index--) {
                  const h = s.hours[index];
                  if (!(dt.getFullYear() === h.date.getFullYear() && dt.getMonth() === h.date.getMonth())) {
                    s.hours.splice(index, 1);
                  }
                }
                const summ = hours.length === 0 ? 0 : hours.reduce((sum, cur) => sum + cur.hours, 0);
                const clientid = s.client.id;
                const projectid = s.project.id;
                const byC = this.byClient.filter(o => o.clientid === clientid);
                if (byC.length === 0) {
                  this.byClient.push({ clientid: s.client.id, title: s.client.title, summ: summ });
                } else {
                  byC[0].summ += summ;
                }
                const byP = this.byProject.filter(o => o.projectid === projectid);
                if (byP.length === 0) {
                  this.byProject.push({ projectid: s.project.id, title: s.project.title, summ: summ });
                } else {
                  byP[0].summ += summ;
                }
              });
            });
            // this.chart01.chart.update();
            // this.chart02.chart.update();
          }
          let temp = [];
          const ds01 = [];
          const ds02 = [];
          const ds11 = [];
          const ds12 = [];
          temp = this.byClient.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
          temp.forEach(d => {
            ds01.push(d.title + ' (' + d.summ + ' часов)');
            ds02.push(d.summ);
          });
          temp = this.byProject.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
          temp.forEach(d => {
            ds11.push(d.title + ' (' + d.summ + ' часов)');
            ds12.push(d.summ);
          });
          this.pieChart01Labels.length = 0;
          this.pieChart01Labels.push(...ds01);
          this.pieChart01Data.length = 0;
          this.pieChart01Data.push(...ds02);

          this.pieChart02Labels.length = 0;
          this.pieChart02Labels.push(...ds11);
          this.pieChart02Data.length = 0;
          this.pieChart02Data.push(...ds12);
        },
        (error): void => {

        });
  }
}
