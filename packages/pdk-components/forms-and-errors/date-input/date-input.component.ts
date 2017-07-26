import { Component, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'pdk-date-input',
  template: `
      <div
      class="form-date">
    
      <div class="form-group form-group-day">
        Day
        <input class="form-control"
               type="text"
               name="dateDay"
               autocomplete="off"
               maxlength="2"
               [value]="displayDay"
               (change)="dayChange($event)"
               (keyup)="dayChange($event)">
      </div>
    
      <div class="form-group form-group-month">
        Month
        <input class="form-control"
               type="text"
               name="dateMonth"
               autocomplete="off"
               maxlength="2"
               [value]="displayMonth"
               (change)="monthChange($event)"
               (keyup)="monthChange($event)">
      </div>
    
      <div class="form-group form-group-year">
        Year
        <input class="form-control"
               type="text"
               name="dateYear"
               autocomplete="off"
               maxlength="4"
               [value]="displayYear"
               (change)="yearChange($event)"
               (keyup)="yearChange($event)">
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ],
  styles: [`
    pdk-date-input {
      outline: none !important;
    
      .form-date {
        &:after {
          content: '';
          display: table;
          clear: both;
        }
      }
    }
  `]
})
export class DateInputComponent implements ControlValueAccessor, Validator {
  private static readonly DATE_FORMAT = /^\d{4}\-\d{2}\-\d{2}T00:00:00$/;

  private rawValue: string = '';
  private displayDay: string = null;
  private displayMonth: string = null;
  private displayYear: string = null;
  private day: string;
  private month: string;
  private year: string;

  writeValue(obj: string): void {
    if (obj) {
      this.rawValue = obj.replace(/T.*/, '');

      this.year = this.displayYear = obj.slice(0, 4);
      this.month = this.displayMonth = obj.slice(5, 7);
      this.day = this.displayDay = obj.slice(8, 10);

    }
  }

  validate(control: FormControl) {
    if (control.value && !this.isDateFormat(control.value)) {
      return {
        pattern: 'Date is not valid'
      };
    }
    return undefined;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  dayChange(event: any) {
    // get value from input
    this.day = event.target.value;

    this.rawValue = this.viewValue();

    // update the form
    this.propagateChange(this.rawValue);
  }

  monthChange(event: any) {
    // get value from input
    this.month = event.target.value;

    this.rawValue = this.viewValue();

    // update the form
    this.propagateChange(this.rawValue);

  }

  yearChange(event: any) {
    // get value from input
    this.year = event.target.value;

    this.rawValue = this.viewValue();

    // update the form
    this.propagateChange(this.rawValue);
  }

  private viewValue(): string {
    if (this.day || this.month || this.year) {
      return [
        this.year ? this.pad(this.year, 4) : '0000',
        this.month ? this.pad(this.month) : '00',
        this.day ? this.pad(this.day) : '00'
      ].join('-') + 'T00:00:00';
    }
    return undefined;
  }

  private propagateChange = (_: any) => { };

  private isDateFormat(val: any): boolean {
    return DateInputComponent.DATE_FORMAT.test(val);
  }

  private toDate(date: any): any {
    if (typeof date === 'string') {
      const [day, month, year] = date.split('-');
      date = Date.UTC(+year, +month - 1, +day);
    }
    return new Date(date);
  }

  private pad(num: any, padNum: number = 2): string {
    const val = num !== undefined ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }

}
