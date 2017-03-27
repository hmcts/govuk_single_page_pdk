import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsetComponent} from './tabset.component';
import {TabComponent} from './tab.component';

export * from './tabset.component';
export * from './tab.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TabsetComponent, TabComponent],
    exports: [TabsetComponent, TabComponent]
})
export class TabsModule {}
