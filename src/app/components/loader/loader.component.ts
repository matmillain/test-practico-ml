import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader-spinner',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss']
})
export class LoaderComponent {
  @Input() title: any;

  constructor() { }
}
