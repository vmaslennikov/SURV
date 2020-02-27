import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';

@JsonApiModelConfig({ type: 'errormessages' })
export class Errormessage extends BaseTitleObject {
  @Attribute() body: string;
}

