import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService
  ]
})
export class LoaderModule { }
