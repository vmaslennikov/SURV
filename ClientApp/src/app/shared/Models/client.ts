import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Company } from './company';

@JsonApiModelConfig({ type: 'clients' })
export class Client extends BaseTitleObject {
  @BelongsTo() company: Company;
  @Attribute() nonResident: boolean;
  get strnonResident() {
    return this.getBooleanText(this.nonResident);
  }
  // @HasMany()
  // comments: Comment[];
}
