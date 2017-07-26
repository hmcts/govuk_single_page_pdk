import { Component, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'pdk-date-input',
  template: `
      <div
      class="form-date">
    
      <div class="form-group form-group-day">
        <label>
          Day
          <input class="form-control"
                 type="text"
                 name="dateDay"
                 autocomplete="off"
                 maxlength="2"
                 [value]="displayDay"
                 (change)="dayChange($event)"
                 (keyup)="dayChange($event)">
        </label>
      </div>
    
      <div class="form-group form-group-month">
        <label>
          Month
          <input class="form-control"
                 type="text"
                 name="dateMonth"
                 autocomplete="off"
                 maxlength="2"
                 [value]="displayMonth"
                 (change)="monthChange($event)"
                 (keyup)="monthChange($event)">
        </label>
      </div>
    
      <div class="form-group form-group-year">
        <label>
          Year
          <input class="form-control"
                 type="text"
                 name="dateYear"
                 autocomplete="off"
                 maxlength="4"
                 [value]="displayYear"
                 (change)="yearChange($event)"
                 (keyup)="yearChange($event)">
        </label>
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
  private static readonly DATE_FORMAT = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

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
        this.year ? this.pad(this.year, 4) : '',
        this.month ? this.pad(this.month) : '',
        this.day ? this.pad(this.day) : ''
      ].join('-') + 'T00:00:00';
    }
    return null;
  }

  private propagateChange = (_: any) => { };

  private isDateFormat(val: any): boolean {
    return DateInputComponent.DATE_FORMAT.test(val);
  }

  private pad(num: any, padNum: number = 2): string {
    const val = num !== undefined ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }

}
