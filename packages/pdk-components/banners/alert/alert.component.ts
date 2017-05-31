import { Component, Input } from '@angular/core';

@Component({
    selector: 'pdk-alert',
    template: `
        <div class="alert alert-{{type}}" role="alert">
            <div class="{{!banner ? '' : bannerClass ? bannerClass : 'alert-container'}}">
                <i class="icon {{type | pdkAlertIconClass}}" role="presentation" aria-hidden="true" *ngIf="showIcon"></i>
                <div class="alert-message" data-ng-transclude>
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class AlertComponent {

    public static readonly TYPE_WARNING = 'warning';
    public static readonly TYPE_CONFIRMATION = 'confirmation';
    public static readonly TYPE_SUCCESS = 'success';

    @Input()
    type: 'warning' | 'confirmation' | 'success' = AlertComponent.TYPE_WARNING;

    @Input()
    banner: boolean = false;

    @Input()
    bannerClass?: string;

    @Input()
    showIcon: boolean = true;
}