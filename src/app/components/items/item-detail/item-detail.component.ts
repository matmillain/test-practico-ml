import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsServices } from '../../../services/items.service';
import { throwError, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

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
    private _itemsServices: ItemsServices,
    private _metaService: Meta
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
        // Get item data
        this.item = data;
        // SEO Friendly
        this._metaService.addTags([
          { name: 'og:title', content: data['title'] },
          { name: 'og:image', content: data['thumbnail'] },
          { name: 'twitter:card', content: data['thumbnail'] },
          { name: 'twitter:site', content: 'Detalle de producto' },
          { name: 'twitter:creator', content: 'Matias Millain' },
          { name: 'twitter:title', content: data['title'] },
          { name: 'twitter:image', content: data['thumbnail'] }
        ]);
        // Get item description and categories
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
      this._metaService.addTags([
        { name: 'og:description', content: this.itemDescription },
        { name: 'twitter:description', content: this.itemDescription }
      ]);
      this.stopLoading();
    },
    error => {
      this.stopLoading();
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
