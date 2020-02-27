import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { AgGridModule } from 'ag-grid-angular';
import * as ruLocale from 'date-fns/locale/ru/index.js';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AccessdeniedComponent } from './shared/components/accessdenied.component';
import { AutocompleteTypeComponent } from './shared/components/autocomplete-type.component';
import { DatepickerTypeComponent } from './shared/components/datepicker-type.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ConstsService } from './shared/services/consts.service';
import { DatasourcesService } from './shared/services/datasources.service';
import { Datastore } from './shared/services/datastore.service';
import { NavService } from './shared/services/nav.service';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { FormlyFieldFile, FileValueAccessor } from './shared/components/file-type.component';
import {TreeTableModule} from 'primeng/treetable';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';

registerLocaleData(localeRu);

const ruConfig = new DateFnsConfigurationService();
ruConfig.setLocale(ruLocale);

/* Import the module*/
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
      '.json'
  );*/
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteTypeComponent,
    DatepickerTypeComponent,
    AccessdeniedComponent,
    FileValueAccessor,
    FormlyFieldFile,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    TreeTableModule,
    TreeModule,
    NgMaterialMultilevelMenuModule,
    LayoutModule,
    OverlayModule,
    HttpClientModule,
    ReactiveFormsModule,
    DateFnsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(), // ToastrModule added,
    MaterialModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field']
        },
        {
          name: 'datepicker',
          component: DatepickerTypeComponent,
          wrappers: ['form-field'],
          defaultOptions: {
            defaultValue: null,
            templateOptions: {
              datepickerOptions: {}
            }
          }
        },
        {
          name: 'file',
          component: FormlyFieldFile,
          wrappers: ['form-field']
        },
      ]
    }),
    FormlyMaterialModule,
    PagesModule
  ],
  providers: [
    Datastore,
    DatasourcesService,
    ConstsService,
    AuthGuard,
    NavService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: MatDialogRef, useValue: null },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: DateFnsConfigurationService, useValue: ruConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
