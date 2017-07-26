import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeadersFootersModule} from './headers-footers/headers-footers.module';
import {TabsModule} from './data-visualisation/tabs/tabs.module';
import { BannersModule } from './banners/banners.module';
import { FormsAndErrorsModule } from './forms-and-errors/forms-and-errors.module';

export * from './headers-footers/headers-footers.module';
export * from './data-visualisation/tabs/tabs.module';

@NgModule({
    imports: [
        CommonModule,
        BannersModule,
        FormsAndErrorsModule
    ],
    declarations: [],
    exports: [
        BannersModule,
        HeadersFootersModule,
        TabsModule,
        FormsAndErrorsModule
    ]
})
export class PdkComponentsModule {}
