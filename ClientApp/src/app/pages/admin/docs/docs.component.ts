import { ModelType, JsonApiQueryData } from 'angular2-jsonapi';

import { Doc } from '../../../shared/Models/Doc';
import { BaseGridComponent } from '../_generic/basegrid.component';
import { DocFormComponent, FolderFormComponent } from './doc.component';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';

@Component({
  selector: 'ngx-filetree',
  template: `
    <div class="row">
      <div class="col-md-3">

        <mat-toolbar color="primary" *ngIf="allowNew && allowDelete">
          <mat-toolbar-row>
            <button mat-button (click)="addFolder()" *ngIf="allowNew">
              <mat-icon>add_circle</mat-icon>
            </button>
            <button mat-button (click)="editFolder()" *ngIf="allowEditFolder">
              <mat-icon>create</mat-icon>
            </button>
            <button mat-button (click)="deleteFolder()" *ngIf="allowDelete">
              <mat-icon>delete_sweep</mat-icon>
            </button>
          </mat-toolbar-row>
        </mat-toolbar>

        <p-tree
          [value]="filesTree"
          selectionMode="single"
          (onNodeSelect)="nodeSelect($event)"
          [(selection)]="selectedFolder"
        ></p-tree>
      </div>
      <div class="col-md-9">
        <mat-toolbar color="primary" *ngIf="allowNew && allowDelete">
          <mat-toolbar-row>
            <button mat-button (click)="add()" *ngIf="allowNew">
              <mat-icon>add_circle</mat-icon>
              Создать
            </button>
            <button mat-button (click)="update()" *ngIf="allowEdit">
              <mat-icon>create</mat-icon>
              Изменить
            </button>
            <button mat-button (click)="delete()" *ngIf="allowDelete">
              <mat-icon>delete_sweep</mat-icon>
              Удалить
            </button>
            <button mat-button (click)="refresh()">
              <mat-icon>cached</mat-icon>
              Обновить
            </button>
          </mat-toolbar-row>
        </mat-toolbar>

        <p-table
          [value]="items"
          [paginator]="true"
          [rows]="size"
          [totalRecords]="total_records"
          [loading]="loading"
          [lazy]="true"
          (onLazyLoad)="onLazyLoad($event)"
          [resizableColumns]="true"
          [scrollable]="true"
          [columns]="columns"
          scrollHeight="800px"
          selectionMode="multiple"
          [(selection)]="selected"
          dataKey="id"
        >
          <ng-template pTemplate="colgroup" let-columns>
            <colgroup>
              <col *ngFor="let col of columns" [style.width]="col.width" />
            </colgroup>
          </ng-template>
          <ng-template pTemplate="header" let-columns>
            <tr>
              <th
                *ngFor="let col of columns"
                [pSortableColumn]="col.prop"
                pResizableColumn
              >
                {{ col.name }}
                <p-sortIcon [field]="col.prop"></p-sortIcon>
              </th>
            </tr>
            <tr class="table-filters">
              <th *ngFor="let col of columns" [ngSwitch]="col.filtertype">
                <input
                  *ngSwitchCase="'string'"
                  pInputText
                  type="text"
                  (input)="
                    filter(
                      $event.target.value,
                      col.prop,
                      col.filterMatchMode ? col.filterMatchMode : 'like'
                    )
                  "
                />
                <!--  -->
                <p *ngSwitchCase="''"></p>
              </th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-item>
            <tr
              [pSelectableRow]="item"
              (dblclick)="onRowDblClick($event, item)"
            >
              <td *ngFor="let col of columns">
                <ng-template
                  [ngIf]="col.isHtml == true"
                  [ngIfElse]="normalTemplate"
                >
                  <span innerHTML="{{ getPropValue(item, col.prop) }}"></span>
                </ng-template>
                <ng-template #normalTemplate>
                  {{ getPropValue(item, col.prop) }}
                </ng-template>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `
})
export class DocsComponent extends BaseGridComponent<Doc> {
  allowNew = this.constsService.IsAdmin;
  allowEditFolder = this.constsService.IsAdmin;
  allowEdit = false;
  allowDelete = this.constsService.IsAdmin;
  sortProps: any = ['title'];
  filesTree: TreeNode[] = [];
  selectedFolder: TreeNode = null;
  getModel(): ModelType<Doc> {
    return Doc;
  }
  getColumns(): Array<object> {
    return [
      // {
      //   name: 'ИД',
      //   prop: 'id',
      //   width: '60px',
      //   filtertype: 'string',
      //   filterMatchMode: 'eq'
      // },
      { name: 'Название', prop: 'link', isHtml: true, filtertype: 'string' },
      // { name: 'Название', prop: 'title', filtertype: 'string' },
      { name: 'Размер', prop: 'size', width: '120px' },
      // { name: 'Скачать', prop: 'path' },
      { name: 'Создано', prop: 'strcreatedAt', width: '120px' },
      // { name: 'Изменено', prop: 'strmodifiedAt', width: '120px' }
    ];
  }
  getQueryParams(page: number): any {
    return {
      sort: this.sortProps,
      page: { size: this.size, number: page }
    };
  }
  add() {
    if (this.selectedFolder && this.selectedFolder.data) {
      // console.log('add Event');
      // this.router.navigate(['pages', this.getRouteName(), 'new']);
      // this.router.navigate(['new'], { relativeTo: this.route });
      const options = {
        width: '650px',
        data: {
          name: 'Диалог',
          folder: this.selectedFolder ? this.selectedFolder['data'] : '0'
        }
      };
      const dialogRef = this.dialog.open(DocFormComponent, options);
      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`); // Pizza!
        this.refresh();
      });
    } else {
      alert('Выберите папку для добавления');
    }
  }
  addFolder() {
    if (this.selectedFolder && this.selectedFolder.data) {
      if (!(this.selectedFolder.data === 1 || this.selectedFolder.data === 2)) {
        alert('Выберите корневую папку для добавления');
        return;
      }
      const dialogRef = this.dialog.open(FolderFormComponent, {
        width: '650px',
        data: {
          name: 'Диалог',
          parentId: this.selectedFolder.data
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getFolders();
        this.refresh();
      });
    } else {
      alert('Выберите корневую папку для добавления');
    }
  }
  editFolder() {
    if (this.selectedFolder && this.selectedFolder.data) {
      if (this.selectedFolder.data === 1 || this.selectedFolder.data === 2) {
        return;
      }
      const dialogRef = this.dialog.open(FolderFormComponent, {
        width: '650px',
        data: {
          name: 'Диалог',
          id: this.selectedFolder.data
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getFolders();
        this.refresh();
      });
    }
  }
  deleteFolder() {
    if (this.selectedFolder && this.selectedFolder.data) {
      if (this.selectedFolder.data === 1 || this.selectedFolder.data === 2) {
        return;
      }
    }
    if (this.selectedFolder && confirm('Объект будет удален. Вы уверены?')) {
      this.datastore.deleteRecord(this.getModel(), this.selectedFolder.data).subscribe(() => {
        this.showToast('Элемент удален');
        this.getFolders();
        this.refresh();
      });
    }
  }
  createTree(items: any[]) {
    return [
      this.createNode({
        id: 1,
        title: 'Документы Компания 01',
        children: (items || []).filter(f => (f.path || '').indexOf('\\1\\') === 0)
      }),
      this.createNode({
        id: 2,
        title: 'Документы Компания 02',
        children: (items || []).filter(f => (f.path || '').indexOf('\\2\\') === 0)
      })
    ];
  }

  createNode(o) {
    const t = {
      data: o.id,
      label: o.title,
      children: [],
      leaf: (o.children || []).length === 0,
      expanded: true
      // expandedIcon: 'fa fa-folder-open',
      // collapsedIcon: 'fa fa-folder'
    };
    for (let index = 0; index < (o.children || []).length; index++) {
      const element = o.children[index];
      t.children.push(this.createNode(element));
    }
    return t;
  }

  getFolders() {
    const qByFolder = {
      sort: ['title'],
      page: { size: 1000, number: 1 },
      filter: {
        length: 'eq:0'
      }
    };
    this.datastore
      .findAll(this.getModel(), qByFolder, this.constsService.noCacheHeaders)
      .subscribe(
        (items: JsonApiQueryData<Doc>) => {
          const folders = items.getModels();
          this.filesTree = this.createTree(folders);
          this.loading = false;
        },
        (error): void => {
          this.loading = false;
        }
      );
  }

  getQuery(page: number, path = null): any {
    const q = this.getQueryParams(page);
    q['filter'] = {};
    if (this.filters.length > 0) {
      this.filters.forEach(f => {
        q['filter'][f.prop] = f.operator + ':' + f.value;
      });
    }
    q['filter']['length'] = 'gt:0';
    if (path) {
      q['filter']['path'] = 'like:' + path;
    }
    return q;
  }

  getItems(page: number) {
    let selectedFolderName =  null;
    if (this.selectedFolder) {
      selectedFolderName = '\\' + this.selectedFolder['data'] + '\\';
    }
    if (!selectedFolderName) {
      this.getFolders();
    }
    selectedFolderName =  selectedFolderName ? selectedFolderName : '\\0\\';
    this.loading = true;
    this.page = page || 1;
    this.datastore
      .findAll(
        this.getModel(),
        this.getQuery(page, selectedFolderName),
        this.constsService.noCacheHeaders
      )
      .subscribe(
        (items: JsonApiQueryData<Doc>) => {
          this.fillProperties(items);
          this.loading = false;
        },
        (error): void => {
          this.loading = false;
        }
      );
  }

  fillProperties(items: JsonApiQueryData<Doc>) {
    this.meta = items.getMeta();
    this.total_records = items.getMeta().meta['total-records'];
    this.items = items.getModels();
    if (this.items.length === 0 && this.page > 1) {
      this.getItems(this.page - 1);
    }
  }

  nodeSelect(event) {
    this.getItems(1);
  }
}

