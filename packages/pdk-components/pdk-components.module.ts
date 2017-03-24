import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeadersFootersModule} from './headers-footers/headers-footers.module';

export * from './headers-footers/headers-footers.module';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [HeadersFootersModule]
})
export class PdkComponentsModule {}
