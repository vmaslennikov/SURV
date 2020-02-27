import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Datastore } from './datastore.service';
import { Company } from '../Models/company';
import { map } from 'rxjs/operators';
import { Grade } from '../Models/grade';
import { Client } from '../Models/client';
import { Role } from '../Models/role';
import { Service } from '../Models/service';
import { Servicetype } from '../Models/servicetype';
import { Unit } from '../Models/unit';
import { Person } from '../Models/person';
import { DatePipe } from '@angular/common';
import { ConstsService } from './consts.service';
import { Project } from '../Models/project';

@Injectable()
export class DatasourcesService {
  constructor(private datastore: Datastore, private consts: ConstsService) {}

  /*Utils*/
  dPipe: DatePipe = new DatePipe('en-US');
  dFormatShort = 'dd.MM.yyyy';

  getProjects(): Observable<any[]> {
    return this.getBaseItems(Project, ['title'], { include: 'client' });
  }
  getCompanies(): Observable<any[]> {
    return this.getBaseItems(Company, ['title']);
  }
  getGrades(): Observable<any[]> {
    return this.getBaseItems(Grade, ['title']);
  }
  getClients(): Observable<any[]> {
    return this.getBaseItems(Client, ['title']);
  }
  getActiveClients(): Observable<any[]> {
    return this.getBaseItems(Client, ['title'], null, { active: true } );
  }
  getRoles(): Observable<any[]> {
    return this.getBaseItems(Role, ['title']);
  }
  getServices(): Observable<any[]> {
    return this.getBaseItems(Service, ['title'], { include: 'unit' });
  }
  getServicesByUnit(unitid: number): Observable<any[]> {
    return this.getBaseItems(Service, ['title'], { include: 'unit' }, { 'unit.id': unitid });
  }
  getServicetypes(): Observable<any[]> {
    return this.getBaseItems(Servicetype, ['title']);
  }
  getUnits(): Observable<any[]> {
    return this.getBaseItems(Unit, ['title']);
  }
  getPersons(): Observable<any[]> {
    return this.getBaseItems(Person, ['fullName'], { include: 'unit' }, null, function(obj, dPipe, dFormatShort) {
      const dtFrom = dPipe.transform(obj.dateFrom, dFormatShort);
      const dtTill = obj.dateTill ? dPipe.transform(obj.dateTill, dFormatShort) : 'Текущее время';
      return {
        id: obj.id,
        title: obj.fullName + ' (' + dtFrom + '-' + dtTill + ')',
        unitid: obj.unit ? obj.unit.id : 0,
        fullName: obj.fullName
      };
    });
  }
  getActivePersons(): Observable<any[]> {
    return this.getBaseItems(Person, ['fullName'], { include: 'unit' }, { active: true }, function(obj, dPipe, dFormatShort) {
      const dtFrom = dPipe.transform(obj.dateFrom, dFormatShort);
      const dtTill = obj.dateTill ? dPipe.transform(obj.dateTill, dFormatShort) : 'Текущее время';
      return {
        id: obj.id,
        title: obj.fullName + ' (' + dtFrom + '-' + dtTill + ')',
        unitid: obj.unit ? obj.unit.id : 0,
        fullName: obj.fullName
      };
    });
  }
  getPersonById(id): Observable<any[]> {
    return this.getBaseItems(Person, ['fullName'], { include: 'unit' }, { id: id }, function(obj, dPipe, dFormatShort) {
      const dtFrom = dPipe.transform(obj.dateFrom, dFormatShort);
      const dtTill = obj.dateTill ? dPipe.transform(obj.dateTill, dFormatShort) : 'Текущее время';
      return {
        id: obj.id,
        title: obj.fullName + ' (' + dtFrom + '-' + dtTill + ')',
        unitid: obj.unit ? obj.unit.id : 0,
        fullName: obj.fullName,
        workType: obj.workType
      };
    });
  }

  getMe(): Observable<any[]> {
    return this.getBaseItems(Person, ['fullName'], null, { id: this.consts.currentUserId }, function(obj, dPipe, dFormatShort) {
      const dtFrom = dPipe.transform(obj.dateFrom, dFormatShort);
      const dtTill = obj.dateTill ? dPipe.transform(obj.dateTill, dFormatShort) : 'Текущее время';
      return {
        id: obj.id,
        title: obj.fullName + ' (' + dtFrom + '-' + dtTill + ')',
        fullName: obj.fullName
      };
    });
  }

  private getBaseItems(model, sortby, include = null, filter = null, action = null): Observable<any[]> {
    const params: any = {
      sort: sortby
    };
    if (include) {
      params.include = include.include;
    }
    if (filter) {
      params.filter = filter;
    }
    params.page = { size: 1000, number: 1 };
    return this.datastore.findAll(model, params, this.consts.noCacheHeaders).pipe(
      map(data => {
        const list = data.getModels();
        const dPipe: DatePipe = new DatePipe('en-US');
        const dFormatShort = 'dd.MM.yyyy';
        return list.map(function(obj: any) {
          if (action !== null) {
            return action(obj, dPipe, dFormatShort);
          }
          const item = { id: obj.id, title: obj.title };
          if (include) {
            include.include.split(',').forEach(f => {
              item[f] = obj[f];
            });
          }
          return item;
        });
      })
    );
  }
}
