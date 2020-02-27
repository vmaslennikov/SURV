import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/shared/Models/client';
import { Company } from 'src/app/shared/Models/company';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { Datastore } from 'src/app/shared/services/datastore.service';

import { DatasourcesService } from './../../shared/services/datasources.service';
import { Tabel } from 'src/app/shared/Models/tabel';
import { Person } from 'src/app/shared/Models/person';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { addMonths } from 'date-fns';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  year: number;
  quartal: number;
  company: string;


  @ViewChild('yearsTabGroup') yearsTabGroup: MatTabGroup;
  @ViewChild('quartalsTabGroup') quartalsTabGroup: MatTabGroup;
  @ViewChild('companiesTabGroup') companiesTabGroup: MatTabGroup;

  Years: any[] = Array.from({ length: (new Date()).getFullYear() + 1 - 2010 }, (x, i) => {
    const temp = (2010 + i);
    return { title: temp, active: temp === this.consts.Year };
  });
  Quartals: any[] = Array.from({ length: 4 }, (x, i) => {
    const temp = i + 1;
    return { title: temp };
  });
  Companies: Company[];

  items: Client[] = [];
  tabels: Tabel[] = [];
  users: Person[] = [];
  usersActual: Person[] = [];
  tCreatedErrorsAll: any[] = [];
  tFilledErrorsAll: any[] = [];
  tApprovedErrorsAll: any[] = [];

  tabelsCreated: false;
  tabelsFilled: false;
  tabelsApproved: false;

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, { width: '550px', height: '600px' });
  }

  constructor(
    public  router: Router,
    public  route: ActivatedRoute,
    public  datastore: Datastore,
    public  datasource: DatasourcesService,
    public  toastrService: ToastrService,
    public  consts: ConstsService,
    public  dialog: MatDialog,
    public  dateFns: DateFnsConfigurationService,
  ) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.quartal = 1;
    this.yearsTabGroup.selectedIndex = this.Years.findIndex(o => o.title === this.consts.Year);
    this.quartalsTabGroup.selectedIndex = 0;
    this.datasource.getCompanies().subscribe(r => {
      this.Companies = this.consts.Companies;
      // if (this.consts.CompanyId) {
      //   this.companiesTabGroup.selectedIndex = this.Companies.findIndex(o => o.Id === this.consts.CompanyId);
      // }
      this.company = this.Companies[0].Id;
      this.companiesTabGroup.selectedIndex = 0;
      this.getItems();
    });
  }

  setYear(index: number) {
    this.year = this.Years[index].title;
    this.getUserItems();
  }
  setQuartal(index: number) {
    this.quartal = index + 1;
    this.getUserItems();
  }
  setCompany(index: number) {
    this.company = this.Companies[index].Id;
    this.getItems();
  }

  getItems() {
    this.datastore.findAll(Client, {
      sort: ['title'],
      page: { size: 1000, number: 1 },
      filter: {
        'company.id': this.company,
        'active': true,
      }
    }, this.consts.noCacheHeaders).subscribe(data => {
      this.items = data.getModels();
      this.getUserItems();
    });
  }

  getMonthByQuartal(q) {
    switch (q) {
      case 1: return [1, 2, 3]; break;
      case 2: return [4, 5, 6]; break;
      case 3: return [7, 8, 9]; break;
      case 4: return [10, 11, 12]; break;
      default:
        break;
    }
  }

  getTabelData() {
    this.tCreatedErrorsAll.length = 0;
    this.tFilledErrorsAll.length = 0;
    this.tApprovedErrorsAll.length = 0;
    const qByTabel = {
      sort: 'person.fullName',
      page: { size: 1000, number: 1 },
      include: 'person,person.companies',
      filter: {
        'company.id': this.company,
        'year': this.year,
        'month': ('in:' + this.getMonthByQuartal(this.quartal).join(','))
      }
    };
    this.datastore.findAll(Tabel, qByTabel, this.consts.noCacheHeaders).subscribe(data => {
      this.tabels = data.getModels();
      const tCreated = [];
      const tFilled = [];
      const tApproved = [];
      const ubyCompany = this.users.filter(o => o.companies.filter(c => c.id === this.company.toString()).length > 0);
      this.getMonthByQuartal(this.quartal).forEach(m => {
        const dt = new Date(this.year, m - 1);
        const dt2 = addMonths(dt, 1);
        this.usersActual = ubyCompany.filter(o => {
          return 1 === 1
            // && o.dateFrom <= dt
            && o.ddateFrom < dt2
            && (!o.ddateTill || (o.ddateTill && (o.ddateTill > dt)));
        });
        const tCreatedErrors = [];
        const tFilledErrors = [];
        const tApprovedErrors = [];
        const tByMonth = this.tabels.filter(t => t.month === m);
        this.usersActual.forEach(u => {
          const tByUserMonth = tByMonth.filter(t => t.person && t.person.id === u.id);
          if (tByUserMonth.length === 0) {
            tCreatedErrors.push({ Month: m, Person: u.fullName });
            tFilledErrors.push({ Month: m, Person: u.fullName });
            tApprovedErrors.push({ Month: m, Person: u.fullName });
          } else {
            if (!tByUserMonth[0].fill) {
              tFilledErrors.push({ Month: m, Person: u.fullName });
            }
            if (!tByUserMonth[0].approve) {
              tApprovedErrors.push({ Month: m, Person: u.fullName });
            }
          }
        });
        tCreated.push(this.usersActual.length > 0 && tCreatedErrors.length === 0);
        tFilled.push(this.usersActual.length > 0 && tFilledErrors.length === 0);
        tApproved.push(this.usersActual.length > 0 && tApprovedErrors.length === 0);
        this.tCreatedErrorsAll.push(...tCreatedErrors);
        this.tFilledErrorsAll.push(...tFilledErrors);
        this.tApprovedErrorsAll.push(...tApprovedErrors);
      });
    });
  }

  getUserQueryParams(): any {
    return {
      sort: 'fullName',
      page: { size: 1000, number: 1 },
      include: 'companies',
    };
  }

  getUserItems() {
    this.tabels = [];
    this.tabelsCreated = false;
    this.tabelsFilled = false;
    this.tabelsApproved = false;

    if (this.users.length) {
      this.getTabelData();
    } else {
      this.datastore.findAll(Person, this.getUserQueryParams(), this.consts.noCacheHeaders)
        .subscribe(
          (items: JsonApiQueryData<Person>) => {
            this.users = items.getModels();
            this.getTabelData();
          },
          (error): void => {

          });
    }
  }
}
