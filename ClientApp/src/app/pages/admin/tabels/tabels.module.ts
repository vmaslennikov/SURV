import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { TabelFormComponent } from './tabel.component';
import { TabelsComponent } from './tabels.component';

@NgModule({
  declarations: [TabelsComponent, TabelFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    TableModule,
  ],
})
export class TabelsModule { }
