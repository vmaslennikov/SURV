import { JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { BaseTitleObject } from './_baseTitleObject';
@JsonApiModelConfig({ type: 'docs' })
export class Doc extends BaseTitleObject {
  @Attribute() folder: boolean;
  @Attribute() length: number;
  @Attribute() path: string;
  get link() {
    return '<a href="/api/Files/Download?fileid=' + this.id + '">' + this.title + '</a>';
  }
  get size() {
    return this.CalcFileSize(this.length);
  }
  CalcFileSize(length) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    let len = length;
    let order = 0;
    while (len >= 1024 && order < sizes.length - 1) {
      order++;
      len = len / 1024;
    }
    return Math.round(len) + ' ' + sizes[order];
  }
}
