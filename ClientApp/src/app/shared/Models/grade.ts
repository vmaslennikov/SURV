import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';

@JsonApiModelConfig({ type: 'grades' })
export class Grade extends BaseTitleObject {

  // @HasMany()
  // comments: Comment[];
}
