import {Component, Input} from '@angular/core';
import {FooterLink} from './footer-link';

@Component({
    selector: 'gov-footer',
    template: require('./footer.component.html')
})
export class FooterComponent {
    @Input()
    links: FooterLink[];

    @Input()
    builtBy: FooterLink;

    @Input()
    minimalView: boolean;

    @Input()
    isBusiness: boolean;

    @Input()
    isBusinessXLarge: boolean;
}