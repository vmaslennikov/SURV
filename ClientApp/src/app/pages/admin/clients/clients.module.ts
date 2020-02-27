import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { ClientFormComponent } from './client.component';
import { ClientsComponent } from './clients.component';
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
  declarations: [ClientsComponent, ClientFormComponent],
})
export class ClientsModule { }
