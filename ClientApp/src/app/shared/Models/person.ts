import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { BaseTitleObject, BaseObject } from './_baseTitleObject';
import { Role } from './role';
import { Company } from './company';
import { Grade } from './grade';
import { Unit } from './unit';

@JsonApiModelConfig({ type: 'persons' })
export class Person extends BaseObject {
  @Attribute() fullName: string;
  @Attribute() userName: string;
  @Attribute() email: string;
  @Attribute() dateFrom?: any;
  @Attribute() dateTill?: any;
  @Attribute() tabelNumber: string;
  @Attribute() workType: number;

  @BelongsTo() unit: Unit;
  @BelongsTo() grade: Grade;
  @BelongsTo() manager: Person;

  @HasMany() roles: Role[];
  @HasMany() companies: Company[];

  get ddateFrom() {
    return new Date(this.dateFrom);
  }
  get ddateTill() {
    return this.dateTill ? new Date(this.dateTill) : null;
  }
  get strdateFrom() {
    return this.dPipe.transform(this.dateFrom, this.dFormatShort);
  }
  get strdateTill() {
    return this.dPipe.transform(this.dateTill, this.dFormatShort);
  }
  get strdatepickerFrom() {
    return this.dPipe.transform(this.dateFrom, this.dFormatShortDatePicker);
  }
  get strdatepickerTill() {
    return this.dPipe.transform(this.dateTill, this.dFormatShortDatePicker);
  }
  get strCompanies() {
    return this.companies.map(c => c.id).join(', ');
  }
  get strworkType() {
    return this.workType === 0 ? 'Штатный сотрудник' : 'Совместитель';
  }
}

@JsonApiModelConfig({ type: 'personcompanies' })
export class PersonCompany extends BaseObject {
  @Attribute() personId: number;
  @Attribute() companyId: number;
}

@JsonApiModelConfig({ type: 'personroles' })
export class PersonRole extends BaseObject {
  @Attribute() personId: number;
  @Attribute() roleId: number;
}
