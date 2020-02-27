import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';

import { Role } from '../Models/role';
import { Company } from './../Models/company';
import { DatasourcesService } from './datasources.service';
import { Datastore } from './datastore.service';
import { Project } from '../Models/project';

@Injectable({ providedIn: 'root' })
export class ConstsService {
  public noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
  });

  Year: number = new Date().getFullYear();
  Month: number = new Date().getMonth() /*begin from 0*/ + 1;
  Companies: Company[];
  Roles: Role[];
  Projects: string[] = [];
  CompanyId: string;
  ManagerFor: number[] = [];

  currentUnitId: number;
  currentUserId: number;
  currentUser: any = null;

  get HasUser() {
    return this.getUserData();
  }
  get IsAdmin() {
    return this.Roles.filter((r, i) => r.Title === 'Администраторы').length > 0;
  }
  get IsHr() {
    return this.Roles.filter((r, i) => r.Title === 'HR').length > 0;
  }
  get IsCoordinator() {
    return this.Roles.filter((r, i) => r.Title === 'Координаторы').length > 0;
  }
  get IsPM() {
    return this.Projects.length > 0;
  }
  get IsBoss() {
    return this.Roles.filter((r, i) => r.Title === 'СУРВ-руководители').length > 0;
  }
  get IsManager() {
    return this.ManagerFor.length > 0;
  }

  constructor(private http: HttpClient, public datastore: Datastore) {}

  /*Utils*/
  dPipe: DatePipe = new DatePipe('en-US');
  dFormatShort = 'dd.MM.yyyy';
  /* guards */

  getUserData() {
    return this.currentUser
      ? of<any>(this.currentUser && this.currentUser.Auth === true) // wrap cached value for consistent return value
      : this.http.get('api/auth/userdata').pipe(
          map((user: any) => {
            if (user) {
              this.currentUser = user;
              this.currentUserId = user.User.Id;
              this.currentUnitId = user.User.UnitId;
              this.Companies = user.User.Companies;
              this.Roles = user.User.Roles;
              if (this.Companies && this.Companies.length > 0) {
                this.CompanyId = this.Companies[0].Id;
              }
              this.ManagerFor = user.User.ManagerFor || [];
              this.Projects = user.User.Projects || [];
            }
            return user && user.Auth === true;
          }),
          catchError(err => {
            return of(false);
          })
        );
  }

  ManageUser(userId: number) {
    return this.ManagerFor.filter(o => o === userId).length > 0;
  }
}
