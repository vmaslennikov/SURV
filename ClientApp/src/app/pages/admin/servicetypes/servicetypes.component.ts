import { ModelType } from 'angular2-jsonapi';

import { Servicetype } from '../../../shared/Models/servicetype';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class ServicetypesComponent extends BaseGridComponent<Servicetype> {
  sortProps: any = ['title'];
  getModel(): ModelType<Servicetype> {
    return Servicetype;
  }
  getRouteName(): string { return 'servicetypes'; }
}

