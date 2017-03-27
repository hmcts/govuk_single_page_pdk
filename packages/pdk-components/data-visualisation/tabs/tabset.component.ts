import {Component, Input, QueryList, ContentChildren, ElementRef, ViewChildren} from "@angular/core";
import {TabComponent} from "./tab.component";

@Component({
    selector: "pdk-tabset",
    template: `
        <div class="tabs" [ngClass]="{'tabs-horizontal': !vertical, 'tabs-vertical': vertical}">
            <div class="tabs-header">
                <ul class="list" role="tablist" (keydown)="changeTab($event)">
                    <li *ngFor="let tab of tabs" role="presentation" (click)="select(tab)">
                        <a (click)="$event.preventDefault()"
                           href=""
                           role="tab"
                           [tabindex]="tab.selected ? '0' : '-1'"
                           [attr.aria-selected]="tab.selected"
                           [attr.aria-controls]="tab.id"
                           #tabHeading>
                            {{tab.heading}}
                        </a>
                    </li>
                </ul>
            </div>
            <ng-content></ng-content>
        </div>
    `
})
export class TabsetComponent {
    @ViewChildren("tabHeading") tabHeadings: QueryList<ElementRef>;
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    @Input() vertical: boolean = false;
    private selectedTab: TabComponent;

    private changeTab(event: KeyboardEvent) {
        const tabs: TabComponent[] = this.tabs.toArray();
        const currentTabIndex = tabs.indexOf(this.selectedTab);

        switch (event.keyCode) {
            case 37:
            case 38:
                event.preventDefault();

                if (currentTabIndex > 0) {
                    this.select(tabs[currentTabIndex - 1]);
                }
                break;

            case 39:
            case 40:
                event.preventDefault();

                if (currentTabIndex < this.tabs.length - 1) {
                    this.select(tabs[currentTabIndex + 1]);
                }
                break;

            default:
                break;
        }
    }

    private select(tab: TabComponent) {
        if (!this.selectedTab) {
            this.selectedTab = this.tabs.find(tab => tab.selected);
        }

        if (!tab.selected) {
            this.selectedTab.selected = false;
            tab.selected = true;
            this.selectedTab = tab;
            this.tabHeadings
                .find(tabheading => tabheading.nativeElement.getAttribute("aria-controls") == this.selectedTab.id)
                .nativeElement.focus();
        }
    }
}