import { BaseFormComponent } from '../_generic/baseform.component';
import { Company } from '../../../shared/Models/company';
import { ModelType } from 'angular2-jsonapi';

export class CompanyFormComponent extends BaseFormComponent<Company> {
  getModel(): ModelType<Company> { return Company; }
}
