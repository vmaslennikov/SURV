import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { BaseModule } from './_generic/base.module';
import { AlertsModule } from './alerts/alerts.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { CostsModule } from './costs/costs.module';
import { ErrormessagesModule } from './errormessages/errormessages.module';
import { GradesModule } from './grades/grades.module';
import { HrmonthsModule } from './hrmonths/hrmonths.module';
import { HryearsModule } from './hryears/hryears.module';
import { MessagesModule } from './messages/messages.module';
import { PersonsModule } from './persons/persons.module';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
import { ServicelinesModule } from './servicelines/servicelines.module';
import { ServicesModule } from './services/services.module';
import { ServicetypesModule } from './servicetypes/servicetypes.module';
import { TabelsModule } from './tabels/tabels.module';
import { UnitsModule } from './units/units.module';
import { UsercalendarsModule } from './usercalendars/usercalendars.module';
import { WorkdaysModule } from './workdays/workdays.module';
import { WsshourModule } from './wsshours/wsshour.module';
import { DocsModule } from './docs/docs.module';


@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    BaseModule,
    AlertsModule,
    ClientsModule,
    CompaniesModule,
    CostsModule,
    ErrormessagesModule,
    GradesModule,
    HrmonthsModule,
    HryearsModule,
    PersonsModule,
    ProjectsModule,
    RolesModule,
    ServicelinesModule,
    ServicesModule,
    ServicetypesModule,
    TabelsModule,
    UnitsModule,
    UsercalendarsModule,
    WorkdaysModule,
    WsshourModule,
    MessagesModule,
    DocsModule,
  ],
  exports: [  ],
})
export class AdminModule { }
