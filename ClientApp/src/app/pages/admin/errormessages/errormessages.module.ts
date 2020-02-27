import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { ErrormessageFormComponent } from './errormessage.component';
import { ErrormessagesComponent } from './errormessages.component';

// import { AgGridModule } from 'ag-grid-angular';
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
  declarations: [ErrormessagesComponent, ErrormessageFormComponent],

})
export class ErrormessagesModule { }
