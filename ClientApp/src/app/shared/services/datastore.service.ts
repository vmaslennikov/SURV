import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig, JsonApiModel, ModelType } from 'angular2-jsonapi';

import { Alert } from '../Models/alert';
import { Client } from '../Models/client';
import { Company } from '../Models/company';
import { Cost } from '../Models/cost';
import { Errormessage } from '../Models/errormessage';
import { Grade } from '../Models/grade';
import { Hrmonth } from '../Models/hrmonth';
import { Hryear } from '../Models/hryear';
import { Person } from '../Models/person';
import { Project } from '../Models/project';
import { Role } from '../Models/role';
import { Service } from '../Models/service';
import { Serviceline } from '../Models/serviceline';
import { Servicetype } from '../Models/servicetype';
import { Tabel } from '../Models/tabel';
import { Unit } from '../Models/unit';
import { Usercalendar } from '../Models/usercalendar';
import { Workday } from '../Models/workday';
import { Wsshour } from '../Models/wsshour';
import { DatasourcesService } from './datasources.service';

const config: DatastoreConfig = {
  baseUrl: 'api/v1',
  models: {
    alerts: Alert,
    clients: Client,
    companies: Company,
    costs: Cost,
    errormessages: Errormessage,
    grades: Grade,
    hrmonths: Hrmonth,
    hryears: Hryear,
    persons: Person,
    projects: Project,
    roles: Role,
    services: Service,
    servicelines: Serviceline,
    servicetypes: Servicetype,
    tabels: Tabel,
    units: Unit,
    usercalendar: Usercalendar,
    workdays: Workday,
    wsshours: Wsshour,
  },
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

  constructor(
    public http: HttpClient,
    ) {
    super(http);
    // this.headers = new Headers({'Cache-Control': 'no-cache'});
  }

  SetRelations<T extends JsonApiModel>(
    modelTypeLeft: ModelType<T>,
    id: string,
    headers?: HttpHeaders,
    customUrl?: string,
    modelTypeRight?: string,
    relationFieldName?: string,
    relations?: any
  ) {
    const rUrl: string = this.buildUrl(modelTypeLeft, null, id, customUrl) + '/relationships/' + relationFieldName;
    const toSend = [];
    if (relations && relations.length > 0) {
      relations.forEach((o: any) => {
        toSend.push({ type: modelTypeRight, id: o.id });
      });
    }
    return this.http.patch(rUrl, { data: toSend }, { headers: this.buildHttpHeaders() })
      .subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }
}
