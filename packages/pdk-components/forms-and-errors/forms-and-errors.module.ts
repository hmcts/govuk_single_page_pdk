import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './date-input/date-input.component';
import { FormsModule } from '@angular/forms';

export * from './date-input/date-input.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DateInputComponent],
    exports: [DateInputComponent]
})
export class FormsAndErrorsModule {}
