import { GovUkHeaderComponent } from './header/header.component';

const module = angular.module('govuk-single-page-pdk.components.headers-footers', [])

  .component('govHeader', GovUkHeaderComponent);

export default module.name;
