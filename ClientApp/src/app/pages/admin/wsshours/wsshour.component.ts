import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModelType } from 'angular2-jsonapi';
import { Serviceline } from 'src/app/shared/Models/serviceline';
import { Wsshour } from 'src/app/shared/Models/wsshour';
import { Datastore } from 'src/app/shared/services/datastore.service';

import { BaseFormComponent } from '../_generic/baseform.component';

export class WsshourFormComponent extends BaseFormComponent<Wsshour> {
  getModel(): ModelType<Wsshour> { return Wsshour; }
  getFields(): FormlyFieldConfig[] {
    return [
      // {
      //   key: 'date', type: 'datepicker',
      //   templateOptions: { label: 'Дата', type: 'text', required: true, readonly: true },
      // },
      {
        key: 'hours', type: 'input',
        templateOptions: {
          label: 'Кол-во часов',
          type: 'number',
          min: 0,
          max: this.dialogData ? this.dialogData.maxValue : 8,
          required: true,
          placeholder: 'Введите значение'
        },
      },
    ];
  }
  getQueryParams(): any {
    return {
      include: 'serviceline'
    };
  }
  subscribeOnId(route: ActivatedRoute, datastore: Datastore) {
    if (this.dialogData && this.dialogData.hId) {
      this.findRecord(datastore, this.dialogData.hId);
      return;
    }

    route.params.subscribe(({ id }) => {
      if (!id || id === 'new') {
        return;
      }
      this.findRecord(datastore, id);
    });
  }

  // ngOnInit() {
  //   // if (this.dialogData) {
  //   //   this.itemform.setValue({
  //   //     date: format(this.dialogData.date, 'yyyy-MM-dd'),
  //   //     hours: 0,
  //   //   });
  //   //   return;
  //   // }
  // }
  setValueForm(item: Wsshour) {
    this.itemform.setValue({
      hours: this.item.hours,
    });
  }

  updateValues(item) {
    item.hours = this.itemform.value.hours;

    item.date = this.dialogData.date;
    item.active = true;
    item.serviceline = this.datastore.peekRecord(Serviceline, this.dialogData.serviceId);
    return false;
  }

  onCreate() {
    this.item = this.datastore.createRecord(this.getModel(), this.model);
    this.updateValues(this.item);
    delete this.item.id;
    this.item.save(this.getQueryParams()).subscribe(
      (data) => {
        // console.log(post);
        // this.router.navigate(['pages', 'companies', data.id]);
        // this.showToast('Элемент создан');
        if (this.dialogRef && this.dialogRef.close) {
          this.dialogRef.close();
          return;
        }
        this.router.navigate(['../', data.id], { relativeTo: this.route });
      },
    );
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
              // this.showToast('Элемент сохранен');
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
