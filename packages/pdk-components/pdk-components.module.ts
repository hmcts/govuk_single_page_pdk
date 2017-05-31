import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeadersFootersModule} from './headers-footers/headers-footers.module';
import {TabsModule} from './data-visualisation/tabs/tabs.module';
import { BannersModule } from './banners/banners.module';

export * from './headers-footers/headers-footers.module';
export * from './data-visualisation/tabs/tabs.module';

@NgModule({
    imports: [
        CommonModule,
        BannersModule
    ],
    declarations: [],
    exports: [
        BannersModule,
        HeadersFootersModule,
        TabsModule
    ]
})
export class PdkComponentsModule {}
