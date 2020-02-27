import { ModelType } from 'angular2-jsonapi';

import { Company } from '../../../shared/Models/company';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class CompaniesComponent extends BaseGridComponent<Company> {
  getModel(): ModelType<Company> { return Company; }
}

