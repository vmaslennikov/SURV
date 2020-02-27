import { UserTabelModule } from 'src/app/shared/components/tabel.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { DashboardComponent } from './dashboard.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
    UserTabelModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
