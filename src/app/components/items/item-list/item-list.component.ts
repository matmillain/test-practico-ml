import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsServices } from '../../../services/items.service';
import { throwError, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../common/loader/loader.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: any;
  param: any;
  categories: any;
  loading = false;
  private _itemEndSubcription: Subscription = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _itemsServices: ItemsServices,
    private _loaderService: LoaderService
  ) { }

  ngOnInit() {
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
    this._loaderService.showLoader();
    this._itemEndSubcription = this._itemsServices.getItemsByQuery(search, limit).subscribe(
      data => {
        this.items = data['results'];
        this.categories = (data['results'].length > 0 && data['filters'].length > 0)
          ? data['filters'][0]['values']['0']['path_from_root']
          : null;
        this.stopLoading();
      },
      error => {
        this.stopLoading();
        return throwError(error);  // Angular 6/RxJS 6
      }
   );
  }

  trackById(index, item) {
    return item.id;
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
