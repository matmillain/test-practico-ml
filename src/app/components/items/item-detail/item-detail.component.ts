import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsServices } from '../../../services/items.service';
import { throwError, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item: any;
  loading: boolean;
  itemDescription: any;
  itemCategories: any;
  private _itemCategoriesEndSubcription: Subscription = null;
  private _itemEndSubcription: Subscription = null;
  private _itemDescriptionEndSubcription: Subscription = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _itemsServices: ItemsServices
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getItem(id);
    });
  }

  ngOnDestroy() {
    this._itemEndSubcription.unsubscribe();
    if (this._itemDescriptionEndSubcription !== null) {
      this._itemDescriptionEndSubcription.unsubscribe();
    }
    if (this._itemCategoriesEndSubcription !== null) {
      this._itemCategoriesEndSubcription.unsubscribe();
    }
  }

  getItem(id: string) {
    this.startLoading();
    this._itemEndSubcription = this._itemsServices.getItemById(id).subscribe(
      data => {
        // refresh the list
        this.item = data;
        this._getDescription(id);
        this._getCategories(data['category_id']);
        this.stopLoading();
      },
      error => {
        this.stopLoading();
        return throwError(error);
      }
   );
  }

  private _getDescription(id) {
   this._itemDescriptionEndSubcription = this._itemsServices.getItemDescription(id).subscribe(
    dataDescription => {
      // refresh the list
      this.itemDescription = dataDescription['plain_text'] ? dataDescription['plain_text'] : 'Sin descripción';
      this.stopLoading();
    },
    error => {
      this.stopLoading();
      this._itemDescriptionEndSubcription.unsubscribe();
      return throwError(error);  // Angular 6/RxJS 6
    }
   );
  }

  private _getCategories(id) {
    this._itemCategoriesEndSubcription = this._itemsServices.getCategoriesById(id).subscribe(
     dataCategories => {
       // refresh the list
       this.itemCategories =
         dataCategories['path_from_root'].length > 0
         ? dataCategories['path_from_root']
         : 'Sin categorías';
       this.stopLoading();
     },
     error => {
       this.stopLoading();
       this._itemCategoriesEndSubcription.unsubscribe();
       return throwError(error);  // Angular 6/RxJS 6
     }
    );
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

}
