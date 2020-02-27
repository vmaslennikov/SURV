import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { TableModule } from 'primeng/table';
// import { AgGridModule } from 'ag-grid-angular';
import { BaseGridComponent } from './basegrid.component';
import { BaseFormComponent } from './baseform.component';
// import { BaseAGGridComponent } from './baseaggrid.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    TableModule,
    // AgGridModule,
  ],
  declarations: [
    BaseFormComponent,
    BaseGridComponent,
    // BaseAGGridComponent,
  ],
})

export class BaseModule { }
