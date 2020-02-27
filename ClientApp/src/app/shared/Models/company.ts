import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Person } from './person';

@JsonApiModelConfig({ type: 'companies' })
export class Company extends BaseTitleObject {

   @HasMany()
   persons: Person[];
}
