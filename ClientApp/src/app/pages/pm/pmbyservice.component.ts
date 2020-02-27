import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Datastore } from 'src/app/shared/services/datastore.service';
import { DatasourcesService } from 'src/app/shared/services/datasources.service';
import { ToastrService } from 'ngx-toastr';
import { ConstsService } from 'src/app/shared/services/consts.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-pmbyservice',
  template: `
    <div>
      <div class="projectData">
        <h4>
          {{ ProjectTitle }}
        </h4>
        <div>
          <table mat-table [dataSource]="ProjectsData" class="table table-striped">
            <ng-container matColumnDef="ServiceName">
              <th mat-header-cell *matHeaderCellDef>Услуга</th>
              <td mat-cell *matCellDef="let o">
              <div *ngFor="let i of o.Items">{{ i.ServiceName }}</div>
              </td>
            </ng-container>
            <ng-container matColumnDef="Sum">
              <th mat-header-cell *matHeaderCellDef>Часы</th>
              <td mat-cell *matCellDef="let o">
              <div *ngFor="let i of o.Items">{{ i.Sum }}</div>
              </td>
            </ng-container>
            <ng-container matColumnDef="PersonName">
              <th mat-header-cell *matHeaderCellDef>Сотрудник</th>
              <td mat-cell *matCellDef="let o">{{o.PersonName}}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns1"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns1"></tr>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .projectData table {
        width: 100%;
      }

      .mat-card {
        // transition: box-shadow 280ms cubic-bezier(.4,0,.2,1);
        display: block;
        position: relative;
        padding: 16px;
        border-radius: 0;
      }

      td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type, th.mat-header-cell:first-of-type{
        padding: 6px;
      }
      tr.mat-footer-row, tr.mat-row {
        height: 24px;
      }

      .mat-column-PersonName {
        flex: 0 0 200px;
      }

      .mat-column-Sum {
        flex: 0 0 100px;
      }
    `
  ]
})
export class PmByServiceComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public datastore: Datastore,
    public datasource: DatasourcesService,
    public toastrService: ToastrService,
    public consts: ConstsService,
    public dialog: MatDialog,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    if (this.dialogData) {
      this.Year = this.dialogData.year;
      this.Month = this.dialogData.month;
      this.ProjectTitle = this.dialogData.projectTitle;
      this.ProjectId = this.dialogData.projectId;
      this.ProjectsData = this.dialogData.data;
    }
  }

  Year: number;
  Month: number;
  ProjectId: number;
  ProjectTitle: number;
  ProjectsData: [];
  displayedColumns1: string[] = ['PersonName', 'ServiceName', 'Sum'];
  displayedColumns2: string[] = ['PersonName', 'ServiceName', 'Sum'];

  ngOnInit() {
    //this.getItems();
  }

  getItems() {
    const url = 'api/projectsdata/byprojectpersonservice?projectId=' + this.ProjectId + '&year=' + this.Year + '&month=' + this.Month;
    this.http.get(url).subscribe((data: any) => {
      this.ProjectsData = [];
      if (data && data.Items && data.Items.length > 0) {
        this.ProjectsData = data.Items;
      }
    });
  }
}
