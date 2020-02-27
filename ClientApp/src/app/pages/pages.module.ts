import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { UserTabelModule } from '../shared/components/tabel.module';
import { TopnavComponent } from '../shared/components/topnav/topnav.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MainModule } from './main/main.module';
import { ManagmentModule } from './managment/managment.module';
import { ManagmenttabelModule } from './managmenttabel/managmenttabel.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ReportsComponent } from './reports/reports.component';
import { PmComponent } from './pm/pm.component';
import { PmByServiceComponent } from './pm/pmbyservice.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    NgMaterialMultilevelMenuModule,

    UserTabelModule,
    PagesRoutingModule,
    MainModule,
    DashboardModule,
    AdminModule,
    ManagmentModule,
    ManagmenttabelModule,
  ],
  declarations: [
    PagesComponent,
    TopnavComponent,
    ReportsComponent,
    PmComponent,
    PmByServiceComponent,
  ],
  exports: [
    PmComponent,
    PmByServiceComponent,
  ],
  bootstrap: [
    TopnavComponent,
    PmByServiceComponent,
  ],
})
export class PagesModule { }
