import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeadersFootersModule} from './headers-footers/headers-footers.module';
import {TabsModule} from './data-visualisation/tabs/tabs.module';

export * from './headers-footers/headers-footers.module';
export * from './data-visualisation/tabs/tabs.module';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [HeadersFootersModule, TabsModule]
})
export class PdkComponentsModule {}
