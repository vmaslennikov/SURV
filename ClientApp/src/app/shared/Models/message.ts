import { Attribute, JsonApiModelConfig, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
import { Person } from './person';

@JsonApiModelConfig({ type: 'messages' })
export class Message extends BaseTitleObject {
  @Attribute()
  body: string;
  @Attribute()
  completed: boolean;
  @BelongsTo()
  person: Person;
  get strСompleted() {
    return this.getBooleanText(this.completed);
  }
}
