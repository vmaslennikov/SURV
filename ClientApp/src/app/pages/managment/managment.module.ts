import { ManagmentComponent } from './managment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [
    ManagmentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TreeTableModule
  ]
})
export class ManagmentModule { }
