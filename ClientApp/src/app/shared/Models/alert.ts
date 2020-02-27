import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';

@JsonApiModelConfig({ type: 'alerts' })
export class Alert extends BaseTitleObject {

  @Attribute() code: string;
  @Attribute() body: string;

  // @HasMany()
  // comments: Comment[];
}
