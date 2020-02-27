import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Person } from './person';

@JsonApiModelConfig({ type: 'roles' })
export class Role extends BaseTitleObject {

  @HasMany()
  persons: Person[];
}
