import { UserTabelComponent } from './tabel.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MaterialModule } from '../modules/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    TableModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    UserTabelComponent,
  ],
  declarations: [
    UserTabelComponent,
  ],
})

export class UserTabelModule { }
