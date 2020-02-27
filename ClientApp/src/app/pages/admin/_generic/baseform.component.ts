import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { JsonApiModel } from 'angular2-jsonapi';
import { ToastrService } from 'ngx-toastr';
import { ConstsService } from 'src/app/shared/services/consts.service';

import { BaseObject } from '../../../shared/Models/_baseTitleObject';
import { DatasourcesService } from '../../../shared/services/datasources.service';
import { Datastore } from '../../../shared/services/datastore.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-from',
  template: `
    <div class="">
      <form [formGroup]="itemform" (ngSubmit)="onSubmit(model)">
        <formly-form [model]="model" [fields]="fields" [options]="options" [form]="itemform"></formly-form>
        <!--<p>{{diagnostic}}</p>-->
        <div clas="row text-right">
          <button type="submit" class="col-4 btn btn-default" *ngIf="allowSave"
            mat-raised-button color="primary">Сохранить</button>
          <button type="button" class="col-4 btn btn-default" (click)="close()"
            mat-raised-button color="primary">Закрыть</button>
          <button type="button" class="col-4 btn btn-default" (click)="delete()"
            *ngIf="item.id && allowDelete" mat-raised-button color="warn">Удалить</button>
        </div>
      </form>
    </div>
  `
})
export class BaseFormComponent<T extends JsonApiModel> implements OnInit {
  public itemform = new FormGroup({});
  public model: any = { id: '', active: true };
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = this.getFields();
  public item: any = { id: '' };

  public allowSave = true;
  public allowDelete = true;

  get diagnostic() {
    return this.model === {} ? null : JSON.stringify(this.model);
  }

  getModel() {
    return BaseObject;
  }

  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title',
        type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true }
      },
      {
        key: 'active',
        type: 'checkbox',
        templateOptions: { label: 'Запись активна' }
      }
    ];
  }
  getQueryParams(): any {
    return {};
  }

  public constructor(
    public router: Router,
    public route: ActivatedRoute,
    public consts: ConstsService,
    public datastore: Datastore,
    public datasources: DatasourcesService,
    public toastrService: ToastrService,
    public http: HttpClient,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.subscribeOnId(route, datastore);
    // console.log('constructor: BaseForm');
  }

  public subscribeOnId(route: ActivatedRoute, datastore: Datastore) {
    route.params.subscribe(({ id }) => {
      if (!id || id === 'new') {
        return;
      }
      this.findRecord(datastore, id);
    });
  }

  public findRecord(datastore: Datastore, id: any) {
    datastore.findRecord(this.getModel(), id, this.getQueryParams()).subscribe(
      item => {
        this.item = item;
        this.setValueForm(item);
        // console.log('success alert', this.item);
      },
      error => {
        console.log('error controll', error);
      }
    );
  }

  ngOnInit() {
    // this.itemform
    //   .valueChanges
    //   .subscribe(data => this.onValueChange(data));
    // console.log(this.dialogData ? JSON.stringify(this.dialogData) : 'no-data-dialog');
  }

  onValueChange(data?: any): void {
    console.log('onValueChange: ' + JSON.stringify(data));
  }

  setValueForm(item) {
    this.itemform.setValue({
      // id: this.item.id,
      title: this.item.title,
      active: this.item.active
    });
  }

  updateValues(item) {
    item.title = this.itemform.value.title;
    item.active = this.itemform.value.active;
    return false;
  }

  onSubmit(model: any) {
    if (this.itemform.valid) {
      if (this.item.id) {
        this.onUpdate();
      } else {
        this.onCreate();
      }
    }
  }

  onUpdate() {
    this.datastore.findRecord(this.getModel(), this.item.id, this.getQueryParams()).subscribe(item => {
      this.updateValues(item);
      item.save().subscribe(data => {
        this.showToast('Элемент сохранен');
        // console.log(data);
        this.item = item;
        // this.router.navigate(['pages', 'alerts', post.id]);
      });
    });
  }

  onCreate() {
    this.item = this.datastore.createRecord(this.getModel(), this.model);
    const overrided = this.updateValues(this.item);
    if (overrided === true) {
      return;
      this.showToast('Элемент создан');
      if (this.dialogRef && this.dialogRef.close) {
        this.dialogRef.close();
        return;
      }
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
    delete this.item.id;
    this.item.save(this.getQueryParams()).subscribe(data => {
      // console.log(post);
      // this.router.navigate(['pages', 'companies', data.id]);
      this.showToast('Элемент создан');
      if (this.dialogRef && this.dialogRef.close) {
        this.dialogRef.close();
        return;
      }
      this.router.navigate(['../', data.id], { relativeTo: this.route });
    });
  }

  delete() {
    // console.log('delete Event');
    if (confirm('Объект будет удален. Вы уверены?')) {
      this.datastore.deleteRecord(this.getModel(), this.item.id).subscribe(() => {
        if (this.dialogRef && this.dialogRef.close) {
          this.dialogRef.close();
          return;
        }
        this.showToast('Элемент удален');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  close() {
    // this.showToast('Закрытие формы');
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
      return;
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  showToast(message: string, position = 'top-right', status = 'Success') {
    this.toastrService.info(message, `Информационное сообщение`);
  }
}
