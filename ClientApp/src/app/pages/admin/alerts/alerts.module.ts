import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { AlertFormComponent } from './alert.component';
import { AlertsComponent } from './alerts.component';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    TableModule,
  ],
  declarations: [
    AlertsComponent,
    AlertFormComponent,
  ],
})

export class AlertsModule { }
