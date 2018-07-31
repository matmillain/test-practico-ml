import { Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsServices } from '../../../services/items.service';
import { throwError, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../common/loader/loader.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: any;
  param: any;
  categories: any;
  dontPreLoad = false;
  private _itemEndSubcription: Subscription = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _itemsServices: ItemsServices,
    private _loaderService: LoaderService,
    private _metaService: Meta
  ) { }

  ngOnInit() {
    // Angular way locale numbers --> (see item-price on html)
    registerLocaleData(es);
    // Get items
    this._activatedRoute.queryParams
      .pipe(params => params)
      .subscribe(params => {
        const search = params.search;
        if (search !== '') {
          this.getItems(search, 4);
        }
      });
  }

  ngOnDestroy() {
    this._itemEndSubcription.unsubscribe();
  }

  getItems(search: string, limit: number) {
    // Variables to show content and loader
    this._loaderService.showLoader();
    this.dontPreLoad = true;
    // Get items list by query
    this._itemEndSubcription = this._itemsServices.getItemsByQuery(search, limit).subscribe(
      data => {
        // Items data
        this.items = data.items;
        this.categories = (data.categories.length > 0)
          ? data.categories
          : null;
        // SEO Friendly
        this._metaService.addTags([
          { name: 'og:title', content: 'Buscando los mejores productos en ' + search },
          { name: 'og:description', content: 'Buscando los mejores productos a tu necesidad en Mercado Libre' },
          { name: 'og:image', content: 'https://mlstaticquic-a.akamaihd.net/ui/navigation/4.0.3/mercadolibre/logo__large_plus@2x.png' },
          { name: 'twitter:description', content: 'Buscando los mejores productos a tu necesidad en Mercado Libre' },
          { name: 'twitter:card', content: 'https://mlstaticquic-a.akamaihd.net/ui/navigation/4.0.3/mercadolibre/logo__large_plus@2x.png' },
          { name: 'twitter:site', content: 'Mercado Libre - Lider latinoamerica en Ventas Online.' },
          { name: 'twitter:creator', content: 'Matias Millain' },
          { name: 'twitter:title', content: 'Buscando los mejores productos en ' + search },
          { name: 'twitter:image', content: 'https://mlstaticquic-a.akamaihd.net/ui/navigation/4.0.3/mercadolibre/logo__large_plus@2x.png' }
        ]);
        // Variables to show content and loader
        this.dontPreLoad = false;
        this._loaderService.hideLoader();
      },
      error => {
        // Variables to show content and loader
        this.dontPreLoad = false;
        this._loaderService.hideLoader();
        return throwError(error);
      }
   );
  }

  trackById(index, item) {
    return item.id;
  }
}
