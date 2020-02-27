import { ModelType } from 'angular2-jsonapi';

import { Grade } from '../../../shared/Models/grade';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class GradesComponent extends BaseGridComponent<Grade> {
  sortProps: any = ['title'];
  getModel(): ModelType<Grade> {
    return Grade;
  }
}

