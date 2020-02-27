import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Person } from './person';
import { Company } from './company';

@JsonApiModelConfig({ type: 'units' })
export class Unit extends BaseTitleObject {

  @BelongsTo() manager: Person;
  @BelongsTo() company: Company;
  // @HasMany()
  // comments: Comment[];
}
