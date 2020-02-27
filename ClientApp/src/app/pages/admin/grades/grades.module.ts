import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TableModule } from 'primeng/table';

import { MaterialModule } from './../../../shared/modules/material/material.module';
import { GradeFormComponent } from './grade.component';
import { GradesComponent } from './grades.component';

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
  declarations: [GradesComponent, GradeFormComponent],
})
export class GradesModule { }
