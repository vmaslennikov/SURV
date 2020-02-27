import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard, BossGuard, CoordinatorGuard, HRGuard, ManagerGuard, PMGuard } from './../shared/services/auth-guard.service';
import { AlertFormComponent } from './admin/alerts/alert.component';
import { AlertsComponent } from './admin/alerts/alerts.component';
import { ClientFormComponent } from './admin/clients/client.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { CompaniesComponent } from './admin/companies/companies.component';
import { CompanyFormComponent } from './admin/companies/company.component';
import { CostFormComponent } from './admin/costs/cost.component';
import { CostsComponent } from './admin/costs/costs.component';
import { ErrormessageFormComponent } from './admin/errormessages/errormessage.component';
import { ErrormessagesComponent } from './admin/errormessages/errormessages.component';
import { GradeFormComponent } from './admin/grades/grade.component';
import { GradesComponent } from './admin/grades/grades.component';
import { HrmonthFormComponent } from './admin/hrmonths/hrmonth.component';
import { HrmonthsComponent } from './admin/hrmonths/hrmonths.component';
import { HryearFormComponent } from './admin/hryears/hryear.component';
import { HryearsComponent } from './admin/hryears/hryears.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { PersonFormComponent } from './admin/persons/person.component';
import { PersonsComponent } from './admin/persons/persons.component';
import { ProjectFormComponent } from './admin/projects/project.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { RoleFormComponent } from './admin/roles/role.component';
import { RolesComponent } from './admin/roles/roles.component';
import { ServicelineFormComponent } from './admin/servicelines/serviceline.component';
import { ServicelinesComponent } from './admin/servicelines/servicelines.component';
import { ServiceFormComponent } from './admin/services/service.component';
import { ServicesComponent } from './admin/services/services.component';
import { ServicetypeFormComponent } from './admin/servicetypes/servicetype.component';
import { ServicetypesComponent } from './admin/servicetypes/servicetypes.component';
import { TabelFormComponent } from './admin/tabels/tabel.component';
import { TabelsComponent } from './admin/tabels/tabels.component';
import { UnitFormComponent } from './admin/units/unit.component';
import { UnitsComponent } from './admin/units/units.component';
import { UsercalendarFormComponent } from './admin/usercalendars/usercalendar.component';
import { UsercalendarsComponent } from './admin/usercalendars/usercalendars.component';
import { WorkdayFormComponent } from './admin/workdays/workday.component';
import { WorkdaysComponent } from './admin/workdays/workdays.component';
import { WsshourFormComponent } from './admin/wsshours/wsshour.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { ManagmentComponent } from './managment/managment.component';
import { ManagmenttabelComponent } from './managmenttabel/managmenttabel.component';
import { PagesComponent } from './pages.component';
import { ReportsComponent } from './reports/reports.component';
import { YearCalendarComponent } from './admin/workdays/yearcalendar.component';
import { PmComponent } from './pm/pm.component';
import { DocsComponent } from './admin/docs/docs.component';
import { DocFormComponent, FolderFormComponent } from './admin/docs/doc.component';
import { MonthdataComponent } from './admin/usercalendars/monthdata.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'main', component: MainComponent },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'messages', component: MessagesComponent, canActivate: [AdminGuard] },

    { path: 'alerts', component: AlertsComponent, canActivate: [AdminGuard] },
    { path: 'alerts/:id', component: AlertFormComponent, canActivate: [AdminGuard] },

    { path: 'clients', component: ClientsComponent, canActivate: [AdminGuard] },
    { path: 'clients/:id', component: ClientFormComponent, canActivate: [AdminGuard] },

    { path: 'companies', component: CompaniesComponent, canActivate: [AdminGuard] },
    { path: 'companies/:id', component: CompanyFormComponent, canActivate: [AdminGuard] },

    { path: 'costs', component: CostsComponent, canActivate: [AdminGuard] },
    { path: 'costs/:id', component: CostFormComponent, canActivate: [AdminGuard] },

    { path: 'errormessages', component: ErrormessagesComponent },
    { path: 'errormessages/:id', component: ErrormessageFormComponent },

    { path: 'grades', component: GradesComponent, canActivate: [AdminGuard] },
    { path: 'grades/:id', component: GradeFormComponent, canActivate: [AdminGuard] },

    { path: 'hryears', component: HryearsComponent, canActivate: [HRGuard] },
    { path: 'hryears/:id', component: HryearFormComponent, canActivate: [HRGuard] },
    { path: 'hrmonths', component: HrmonthsComponent, canActivate: [HRGuard] },
    { path: 'hrmonths/:id', component: HrmonthFormComponent, canActivate: [HRGuard] },

    { path: 'persons', component: PersonsComponent, canActivate: [AdminGuard] },
    { path: 'persons/:id', component: PersonFormComponent, canActivate: [AdminGuard] },

    { path: 'projects', component: ProjectsComponent, canActivate: [AdminGuard] },
    { path: 'projects/:id', component: ProjectFormComponent, canActivate: [AdminGuard] },

    { path: 'roles', component: RolesComponent, canActivate: [AdminGuard] },
    { path: 'roles/:id', component: RoleFormComponent, canActivate: [AdminGuard] },

    { path: 'services', component: ServicesComponent, canActivate: [AdminGuard] },
    { path: 'services/:id', component: ServiceFormComponent, canActivate: [AdminGuard] },

    { path: 'servicetypes', component: ServicetypesComponent, canActivate: [AdminGuard] },
    { path: 'servicetypes/:id', component: ServicetypeFormComponent, canActivate: [AdminGuard] },

    { path: 'servicelines', component: ServicelinesComponent, canActivate: [AdminGuard] },
    { path: 'servicelines/:id', component: ServicelineFormComponent, canActivate: [AdminGuard] },

    { path: 'tabels', component: TabelsComponent, canActivate: [AdminGuard] },
    { path: 'tabels/:id', component: TabelFormComponent, canActivate: [AdminGuard] },

    { path: 'units', component: UnitsComponent, canActivate: [AdminGuard] },
    { path: 'units/:id', component: UnitFormComponent, canActivate: [AdminGuard] },

    { path: 'usercalendars', component: UsercalendarsComponent },
    { path: 'usercalendars/:id', component: UsercalendarFormComponent },
    { path: 'companycalendar', component: MonthdataComponent, canActivate: [HRGuard] },

    { path: 'workdays', component: WorkdaysComponent , canActivate: [HRGuard]},
    { path: 'workdays/:id', component: WorkdayFormComponent , canActivate: [HRGuard]},
    { path: 'workdayscalendar', component: YearCalendarComponent , canActivate: [HRGuard]},

    { path: 'wsshours/:id', component: WsshourFormComponent, canActivate: [AdminGuard] },

    { path: 'docs', component: DocsComponent },
    { path: 'docs/:id', component: DocFormComponent },
    { path: 'folder/:id', component: FolderFormComponent },

    { path: 'pm', component: PmComponent, canActivate: [PMGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [CoordinatorGuard] },
    { path: 'managment', component: ManagmentComponent, canActivate: [ ManagerGuard] },
    { path: 'managment/:id', component: ManagmenttabelComponent, canActivate: [ ManagerGuard] },

    { path: 'pages', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'main', pathMatch: 'full' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AdminGuard,
    HRGuard,
    ManagerGuard,
    BossGuard,
    CoordinatorGuard,
    PMGuard,
  ]
})
export class PagesRoutingModule {}
