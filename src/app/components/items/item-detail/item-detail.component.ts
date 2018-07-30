import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsServices } from '../../../services/items.service';
import { throwError, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { LoaderService } from '../../../common/loader/loader.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item: any = [];
  itemDescription: any = '';
  itemCategories: any = [];
  private _itemCategoriesEndSubcription: Subscription = null;
  private _itemEndSubcription: Subscription = null;
  private _itemDescriptionEndSubcription: Subscription = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _itemsServices: ItemsServices,
    private _metaService: Meta,
    private _loaderService: LoaderService,
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
    this._loaderService.showLoader();
    this._itemEndSubcription = this._itemsServices.getItemById(id).subscribe(
      data => {
        // Get item data
        this.item = data.item;
        // Get item description and categories
        this._getDescription(id);
        this._getCategories(data['item']['category_id']);
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
        // Loader
        this._loaderService.hideLoader();
      },
      error => {
        this._loaderService.hideLoader();
        return throwError(error);
      }
   );
  }

  private _getDescription(id) {
   this._itemDescriptionEndSubcription = this._itemsServices.getItemDescription(id).subscribe(
    dataDescription => {
      // refresh the list
      this.itemDescription = dataDescription['plain_text'];
      this._metaService.addTags([
        { name: 'og:description', content: this.itemDescription },
        { name: 'twitter:description', content: this.itemDescription }
      ]);
    },
    error => {
      this.itemDescription = 'Sin descripción. Consulta con el vendedor para saber más detalles del producto.';
      return throwError(error);  // Angular 6/RxJS 6
    }
   );
  }

  private _getCategories(id) {
    this._itemCategoriesEndSubcription = this._itemsServices.getCategoriesById(id).subscribe(
     dataCategories => {
       // refresh the list
       if (dataCategories['path_from_root'].length > 0) {
        dataCategories['path_from_root'].forEach(category => {
          this.itemCategories.push(
            category.name
          );
        });
       } else {
         this.itemCategories.push('Sin categorias');
       }
     },
     error => {
       return throwError(error);  // Angular 6/RxJS 6
     }
    );
  }

}
