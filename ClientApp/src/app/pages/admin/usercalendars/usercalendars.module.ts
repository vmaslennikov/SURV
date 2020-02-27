import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { UsercalendarFormComponent } from './usercalendar.component';
import { UsercalendarsComponent } from './usercalendars.component';
import { MonthdataComponent } from './monthdata.component';

@NgModule({
  declarations: [UsercalendarsComponent, UsercalendarFormComponent, MonthdataComponent],
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
export class UsercalendarsModule { }
