import { LoaderModule } from '../../common/loader/loader.module';
import { HandleErrorsComponent } from '../../common/handle-errors/handle-errors.component';
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
    FlexLayoutModule,
    LoaderModule
  ],
  declarations: [
    ItemListComponent,
    ItemDetailComponent,
    ItemCategoriesComponent,
    HandleErrorsComponent
  ],
  providers: [
    ItemsServices,
    LoaderModule
  ]
})
export class ItemsModule { }
