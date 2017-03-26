import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'gov-header',
    template: `
        <div id="skiplink-container">
            <div>
                <a href="javascript:;"
                   (click)="navigation.mainContent.navigate()"
                   *ngIf="undefined === showSkipLink || showSkipLink"
                   class="skiplink">
                    {{skipLinkText}}
                </a>
            </div>
        </div>
        <div id="global-cookie-message" *ngIf="showCookie" style="display: block">
            <p #cookies><ng-content></ng-content></p>
            <p *ngIf="0 == cookies.childNodes.length">
                GOV.UK uses cookies to make the site simpler.
                <a href="https://www.gov.uk/help/cookies">Find out more about cookies</a>
            </p>
        </div>
        <div id="header-wrapper"
             [ngClass]="{
                'minimal-view': minimalView
             }">
            <header role="banner" id="global-header" class="with-proposition">

                <div class="header-wrapper"
                     [ngClass]="{
                        'business': isBusiness,
                        'business-x-large': isBusinessXLarge
                     }">

                    <div class="header-global">
                        <div *ngIf="!titleDisabled" class="header-logo">
                            <a [href]="linkTitle" title="Go to the GOV.UK homepage" id="logo">
                                <img *ngIf="!minimalView" [src]="logoUrl" width="35" height="31" alt=""> <span>{{title}}</span>
                            </a>
                        </div>
                    </div>

                    <div class="header-proposition" *ngIf="navItems">
                        <div class="content">
                            <a href="javascript:;" (click)="toggleMenu()" class="js-header-toggle menu" [ngClass]="{'open': menuOpen}">Menu</a>
                            <nav id="proposition-menu">
                                <a *ngIf="!minimalView" href="javascript:;" (click)="navigation.home.navigate()" id="proposition-name">{{heading}}</a>
                                <ul id="proposition-links" [ngClass]="{'js-visible': menuOpen}">
                                    <li *ngFor="let navItem of navItems">
                                        <a [routerLink]="navItem.link">{{navItem.label}}</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div id="global-header-bar"
                 [ngClass]="{
                     'business': isBusiness,
                     'service': titleDisabled
                 }"></div>
        </div>
    `
})
export class HeaderComponent implements OnInit {
    @Input()
    heading: string;

    @Input() // TODO: Pass links by transclusion to support all kind of links
    navItems: {link: string; label: string}[];

    @Input() // FIXME: Not very user friendly
    navigation: {mainContent: {navigate: () => void}, home: {navigate: () => void}};

    @Input()
    showCookie: boolean; // if true will display the cookie message over the header

    @Input()
    showSkipLink: boolean; // if true will display 'Skip to main content' link

    @Input()
    isBusiness: boolean; // if true the width will expand to 1170px,

    @Input()
    isBusinessXLarge: boolean; // if true the width will expand to 1370px

    @Input()
    logoUrl: string;

    @Input()
    title: string;

    @Input()
    titleDisabled: boolean; // if true no title will be shown on the header and bottom blue bar disappears.

    @Input()
    linkTitle: string;

    @Input()
    minimalView: boolean;  // if true header will be in minimal(non-gov) mode.

    @Input()
    skipLinkText: string;

    menuOpen: boolean = false;

    ngOnInit(): void {
        // setting some default values
        this.logoUrl = this.logoUrl || '/assets/images/gov.uk_logotype_crown.png';
        this.title = (this.minimalView) ? '' : this.title || 'GOV.UK';
        this.linkTitle = this.linkTitle || 'https://www.gov.uk';
        this.skipLinkText = this.skipLinkText || 'Skip to main content';
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
    }
}