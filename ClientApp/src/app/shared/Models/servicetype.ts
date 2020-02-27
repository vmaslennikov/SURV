import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';

@JsonApiModelConfig({ type: 'servicetypes' })
export class Servicetype extends BaseTitleObject {

  // @HasMany()
  // comments: Comment[];
}
