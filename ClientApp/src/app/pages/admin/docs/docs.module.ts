import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { DocsComponent } from './docs.component';
import { DocFormComponent, FolderFormComponent } from './doc.component';
import { TreeModule } from 'primeng/tree';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    TableModule,
    TreeModule
   ],
   declarations: [
     DocsComponent,
     DocFormComponent,
     FolderFormComponent
    ],

})
export class DocsModule { }
