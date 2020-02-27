import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Servicetype } from '../../../shared/Models/servicetype';

export class ServicetypeFormComponent extends BaseFormComponent<Servicetype> {
  getModel(): ModelType<Servicetype> { return Servicetype; }
}
