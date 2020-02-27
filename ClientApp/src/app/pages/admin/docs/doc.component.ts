import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Doc } from 'src/app/shared/Models/Doc';
import { Output } from '@angular/core';
import { EventEmitter } from 'events';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';

export class DocFormComponent extends BaseFormComponent<Doc> {

  public progress: number;
  public message: string;

  getModel(): ModelType<Doc> { return Doc; }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'file',
        type: 'file',
        templateOptions: {
          multiple: false,
          required: true
        }
      },
    ];
  }
  onSubmit(model: any) {
    if (this.itemform.valid) {
      this.uploadFile(this.itemform.value.file);
    }
  }

  uploadFile(files) {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const folder = this.dialogData.folder;
    const postUrl = '/api/Files/Upload?f=' + folder;
    this.http.post(postUrl, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          console.log(this.message);
          if (this.dialogRef && this.dialogRef.close) {
            this.dialogRef.close();
          }
        }
      });
  }
}

export class FolderFormComponent extends BaseFormComponent<Doc> {
  subscribeOnId(route: ActivatedRoute, datastore: Datastore) {
    if (this.dialogData && this.dialogData.id) {
      this.findRecord(datastore, this.dialogData.id);
      return;
    }
    // route.params.subscribe(({ id }) => {
    //   if (!id || id === 'new') {
    //     if (this.dialogData && this.dialogData.parentId) {
    //       this.model['tabel'] = this.dialogData.parentId;
    //     }
    //     return;
    //   }
    //   this.findRecord(datastore, id);
    // });
  }
  getModel(): ModelType<Doc> { return Doc; }
  getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'title', type: 'input',
        templateOptions: { label: 'Название', placeholder: 'Введите значение', required: true },
      },
    ];
  }

  setValueForm(item) {
    this.itemform.setValue({
      title: this.item.title,
      folder: true,
      path: '',
      length: 0,
      active: true,
    });
  }
  updateValues(item) {
    item.title = this.itemform.value.title;
    item.folder = true;
    item.active = true;
    item.path = '';
    item.length = 0;
    return false;
  }

  onUpdate() {
    this.datastore.findRecord(this.getModel(), this.item.id, this.getQueryParams()).subscribe(item => {
      const pathBefore = item.path;
      this.updateValues(item);
      item.path = pathBefore;
      item.save().subscribe(data => {
        this.showToast('Элемент сохранен');
        this.item = item;
      });
    });
  }

  onCreate() {
    this.item = this.datastore.createRecord(this.getModel(), this.model);
    const overrided = this.updateValues(this.item);
    if (overrided === true) {
      return;
    }
    delete this.item.id;
    this.item.save(this.getQueryParams()).subscribe(data => {
      this.item.path = '\\' + (this.dialogData.parentId ? (this.dialogData.parentId + '\\' + data.id) : data.id) + '\\';
      this.item.save(this.getQueryParams()).subscribe(data => {
        this.showToast('Элемент создан');
        if (this.dialogRef && this.dialogRef.close) {
          this.dialogRef.close();
          return;
        }
        this.router.navigate(['../', data.id], { relativeTo: this.route });
      });
    });
  }
}
