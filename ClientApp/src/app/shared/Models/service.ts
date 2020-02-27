import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Servicetype } from './servicetype';
import { Company } from './company';
import { Unit } from './unit';

@JsonApiModelConfig({ type: 'services' })
export class Service extends BaseTitleObject {

  @BelongsTo()  company: Company;
  @BelongsTo()  unit: Unit;
  @BelongsTo()  servicetype: Servicetype;

  @Attribute()  comment: string;
}
