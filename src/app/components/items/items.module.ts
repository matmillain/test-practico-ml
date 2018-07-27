import { HandleErrorsComponent } from './../handle-errors/handle-errors.component';
import { LoaderComponent } from './../loader/loader.component';
import { ItemCategoriesComponent } from './item-categories/item-categories.component';

import { ItemsRoutingModule } from './items-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsServices } from '../../services/items.service';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    ItemListComponent,
    ItemDetailComponent,
    ItemCategoriesComponent,
    LoaderComponent,
    HandleErrorsComponent
  ],
  providers: [
    ItemsServices
  ]
})
export class ItemsModule { }
