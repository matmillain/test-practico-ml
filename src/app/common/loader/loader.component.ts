import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
    selector: 'app-loader-spinner',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() title = 'Default title';
  showLoader: boolean;

  constructor(
      private loaderService: LoaderService) {
  }

  ngOnInit() {
      this.loaderService.status.subscribe((val: boolean) => {
          this.showLoader = val;
      });
  }
}
