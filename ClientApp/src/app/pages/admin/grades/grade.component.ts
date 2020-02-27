import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Grade } from '../../../shared/Models/grade';

export class GradeFormComponent extends BaseFormComponent<Grade> {
  getModel(): ModelType<Grade> { return Grade; }
}
