import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
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
