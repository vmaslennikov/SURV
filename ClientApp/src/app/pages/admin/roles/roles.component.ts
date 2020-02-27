import { ModelType } from 'angular2-jsonapi';

import { Role } from '../../../shared/Models/role';
import { BaseGridComponent } from '../_generic/basegrid.component';

export class RolesComponent extends BaseGridComponent<Role> {
  sortProps: any = ['title'];
  getModel(): ModelType<Role> {
    return Role;
  }
}

