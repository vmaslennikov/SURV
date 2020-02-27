import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModelType } from 'angular2-jsonapi';

import { Client } from '../../../shared/Models/client';
import { Project } from '../../../shared/Models/project';
import { Service } from '../../../shared/Models/service';
import { Serviceline } from '../../../shared/Models/serviceline';
import { Tabel } from '../../../shared/Models/tabel';
import { BaseFormComponent } from '../_generic/baseform.component';
import { takeUntil, startWith, tap, map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';

export class ServicelineFormComponent extends BaseFormComponent<Serviceline> implements OnDestroy {
  onDestroy$ = new Subject<void>();
  clients: Observable<any[]> = this.datasources.getClients();
  projects: Observable<any[]> = this.datasources.getProjects();
  services: Observable<any[]> = this.datasources.getServices();

  unitId: number;
  serviceByUnit: Observable<any[]> =  this.datasources.getServicesByUnit(this.unitId);

  // _servicesCollection = [];
  // get servicesCollection () {
  //   if (this._servicesCollection.length === 0) {
  //     this.services.subscribe(c => {
  //       c.forEach(o => {
  //         if (this.unitId === o.unit.id) {
  //           this._servicesCollection.push(o);
  //         }
  //       });
  //     });
  //   }
  //   return this._servicesCollection;
  // }

  subscribeOnId(route: ActivatedRoute, datastore: Datastore) {
    if (this.dialogData && this.dialogData.unitId) {
      this.unitId = this.dialogData.unitId;
    }
    if (this.dialogData && this.dialogData.serviceId) {
      this.findRecord(datastore, this.dialogData.serviceId);
      return;
    }
    route.params.subscribe(({ id }) => {
      if (!id || id === 'new') {
        if (this.dialogData && this.dialogData.tabelId) {
          this.model['tabel'] = this.dialogData.tabelId;
        }
        return;
      }
      this.findRecord(datastore, id);
    });
  }

  getModel(): ModelType<Serviceline> { return Serviceline; }
  getQueryParams(): any {
    return {
      include: 'tabel,service,project,client,hours',
    };
  }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'tabel',
        type: 'input',
        className: 'hide',
        // hideExpression: () => true,
        // hideExpression: true,
        templateOptions: {
          label: 'Табель',
          readonly: true,
          required: true,
        },
      },
      {
        key: 'client',
        type: 'select',
        templateOptions: {
          label: 'Клиент',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          options: this.datasources.getActiveClients(),
        },
      },
      {
        key: 'project',
        type: 'select',
        templateOptions: {
          label: 'Проект',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          options: [],
        },
        expressionProperties: {
          'templateOptions.disabled': '!model.client',
        },
        hooks: {
          onInit: (field) => {
            const ds = [];
            // this.datasources.getProjects();
            const form = field.parent.formControl;
            form.get('client').valueChanges.pipe(
              takeUntil(this.onDestroy$),
              startWith(form.get('client').value),
              tap(clientId => {
                field.formControl.setValue(null);
                field.templateOptions.options = clientId ?
                  this.projects.pipe(map(d => d.filter(p => p.client.id === clientId))) :
                  ds;
              }),
            ).subscribe();
          }
        }
      },
      {
        key: 'service', type: 'select',
        templateOptions: {
          label: 'Услуга',
          required: true,
          valueProp: 'id',
          labelProp: 'title',
          // options: this.unitId > 0 ? this.datasources.getServicesByUnit(this.unitId) : this.datasources.getServices(),
          options: [],
        },
        expressionProperties: {
          'templateOptions.disabled': '!model.client',
        },
        hooks: {
          onInit: (field) => {
            const ds = [];
            // this.datasources.getProjects();
            const form = field.parent.formControl;
            field.formControl.setValue(null);
            field.templateOptions.options = this.services.pipe(map(d => d.filter(p => p.unit.id === this.unitId)));
          }
        }
      },
      // {
      //   key: 'service',
      //   type: 'autocomplete',
      //   templateOptions: {
      //     label: 'Услуга',
      //     required: true,
      //     valueProp: 'id',
      //     labelProp: 'title',
      //     // placeholder: 'Услуга',
      //     filter: (term) => (term ? this.filterServices(term) : this.filterServices(null)),
      //   },
      // },
      {
        key: 'result', type: 'textarea',
        templateOptions: { label: 'Результат', rows: 3, required: true },
      },
      {
        key: 'active', type: 'checkbox', className: 'hide',
        templateOptions: { label: 'Активная запись', readonly: true, },
      },
    ];
  }

  filterServices(name: string) {
    if (name) {
      // const number = parseInt(name, 10);
      // let data = of([]);
      // if (number > 0) {
      //   return this.serviceByUnit.pipe(map(d => d.filter(p => p.title.toLowerCase().indexOf(f) !== -1)));
      // }
      const f = name.toLowerCase();
      // return this.servicesCollection.filter(p => p.id === name || p.title.toLowerCase().indexOf(f) !== -1);
      return this.services.pipe(
        map(d => d.filter(p => this.unitId === p.unit.id && (p.id === name || p.title.toLowerCase().indexOf(f) !== -1)))
      );
    } else {
      // return this.servicesCollection;
      return this.services.pipe(map(d => d.filter(o => this.unitId === o.unit.id)));
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  setValueForm(item: Serviceline) {
    // let tId = (this.item.tabel ? this.item.tabel.id : null);
    // tId = tId ? tId : this.dialogData && this.dialogData.tabelId ? this.dialogData.tabelId : null;
    // let serviceId = null;
    // if (this.item.service) {
    // }

    this.itemform.setValue({
      client: this.item.client ? this.item.client.id : null,
      project: this.item.project ? this.item.project.id : null,
      result: this.item.result,
      tabel: (this.item.tabel ? this.item.tabel.id : null),
      active: true,
      service: this.item.service ? this.item.service.id : null,
    });
  }
  updateValues(item) {
    item.result = this.itemform.value.result;
    item.active = true;

    // relationships
    item.client = this.datastore.peekRecord(Client, this.itemform.value.client);
    item.project = this.datastore.peekRecord(Project, this.itemform.value.project);
    item.service = this.datastore.peekRecord(Service, this.itemform.value.service);
    if (this.dialogData && this.dialogData.tabelId) {
      item.tabel = this.datastore.peekRecord(Tabel, this.dialogData.tabelId);
    } else {
      item.tabel = this.datastore.peekRecord(Tabel, this.itemform.value.tabel);
    }
    return false;
  }

  onUpdate() {
    this.datastore.findRecord(
      this.getModel(),
      this.item.id,
      this.getQueryParams())
      .subscribe(
        item => {
          this.updateValues(item);
          item.save().subscribe(
            data => {
              this.showToast('Элемент сохранен');
              if (this.dialogRef && this.dialogRef.close) {
                this.dialogRef.close();
                return;
              }
              // console.log(data);
              this.item = item;
              // this.router.navigate(['pages', 'alerts', post.id]);
            },
          );
        });
  }
}
