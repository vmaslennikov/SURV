import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject, BaseObject } from './_baseTitleObject';
import { Wsshour } from './wsshour';
import { Service } from './service';
import { Project } from './project';
import { Client } from './client';
import { Tabel } from './tabel';

@JsonApiModelConfig({ type: 'servicelines' })
export class Serviceline extends BaseObject {
  @BelongsTo()  service: Service;
  @BelongsTo()  project: Project;
  @BelongsTo()  client: Client;
  @BelongsTo()  tabel: Tabel;
  @Attribute()  result: string;
  @HasMany() hours: Wsshour[];
}
