import { BaseFormComponent } from '../_generic/baseform.component';
import { ModelType } from 'angular2-jsonapi';
import { Role } from '../../../shared/Models/role';

export class RoleFormComponent extends BaseFormComponent<Role> {
  getModel(): ModelType<Role> { return Role; }
}
