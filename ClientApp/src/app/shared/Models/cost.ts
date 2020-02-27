import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Client } from './client';
import { Grade } from './grade';

@JsonApiModelConfig({ type: 'costs' })
export class Cost extends BaseTitleObject {

  @BelongsTo() client: Client;
  @BelongsTo() grade: Grade;
  @Attribute() sum: number;
  @Attribute() currency: string;
  // @HasMany()
  // comments: Comment[];
}


