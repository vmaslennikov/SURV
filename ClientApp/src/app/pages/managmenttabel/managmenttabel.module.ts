import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserTabelModule } from 'src/app/shared/components/tabel.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { ManagmenttabelComponent } from './managmenttabel.component';

@NgModule({
  declarations: [
    ManagmenttabelComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserTabelModule,
  ]
})
export class ManagmenttabelModule { }
