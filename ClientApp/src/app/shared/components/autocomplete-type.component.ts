import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap, map, filter } from 'rxjs/operators';
import { DatasourcesService } from '../services/datasources.service';
import { Service } from '../Models/service';

@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder"
      [errorStateMatcher]="errorStateMatcher"
    />
    <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn.bind(this)">
      <mat-option *ngFor="let value of filter | async" [value]="value.id">
        {{ value.title }}
      </mat-option>
    </mat-autocomplete>
  `
})
export class AutocompleteTypeComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild(MatInput) formFieldControl: MatInput;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  filter: Observable<any[]>;

  public constructor(public datasources: DatasourcesService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(
        term => this.to.filter(term)
      )
    );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // temporary fix for https://github.com/angular/material2/issues/6728
    (<any>this.autocomplete)._formField = this.formField;
  }

  // displayFn(item?: Service): string | undefined {
  //   return item ? item.title : undefined;
  // }

  displayFn(id) {
    if (!id) {
      return null;
    }
    return this.filter.pipe(
      map(arr => {
        const items = arr.filter(option => option.id === id);
        if (items.length > 0) {
          return items[0].title;
        }
        return '';
      })
    );
  }
}
