import {throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemsServices {
  urlBase = environment.urlWebApiConfiguracion;
  urlBaseComplementMLA = this.urlBase + environment.siteMLAComplement;

  constructor(
    private http: HttpClient
  ) { }

  getItemsByQuery(query: string = '', limit: number = 10) {
    const QUERY = `search?q=${query}&limit=${limit}`;
    const API_URL = this.urlBaseComplementMLA + QUERY;
    return this.http.get(API_URL)
      .pipe(
        map(
          data => {
            return this.formatterItemsList(data);
          }
        ),
        catchError(this.errorHandler)
      );
  }

  getItemById(id: string = '0') {
    const QUERY = `items/${id}`;
    const API_URL = this.urlBase + QUERY;
    return this.http.get(API_URL)
      .pipe(
        map(
          data => {
            return this.formatterItem(data);
          }
        ),
        catchError(this.errorHandler)
      );
  }

  getItemDescription(id: string = '0') {
    const QUERY = `items/${id}/description`;
    const API_URL = this.urlBase + QUERY;
    return this.http.get(API_URL)
      .pipe(
        tap(
          data => data,
          catchError(this.errorHandler)
        )
      );
  }

  getCategoriesById(id: string = '0') {
    const QUERY = `categories/${id}`;
    const API_URL = this.urlBase + QUERY;
    return this.http.get(API_URL)
      .pipe(
        tap(
          data => data,
          catchError(this.errorHandler)
        )
      );
  }

  formatterItemsList(itemsData) {
    const modifyItemsList = {
      'author': {
        name: 'Matias',
        lastname: 'Millain'
      },
      'categories': [],
      'items': []
    };

    // Result categories
    itemsData.filters[0].values[0].path_from_root.forEach(category => {
      modifyItemsList.categories.push(
        category.name
      );
    });

    // Result items
    itemsData.results.forEach(itemDetail => {
      modifyItemsList.items.push({
        'id': itemDetail.id,
        'title': itemDetail.title,
        'price': {
          'currency': itemDetail.currency_id,
          'amount': itemDetail.price,
          'decimals': 2
        },
        'picture': (itemDetail.thumbnail.length) ? itemDetail.thumbnail : 'assets/images/none_img.jpg',
        'condition': itemDetail.condition,
        'free_shipping': itemDetail.shipping.free_shipping,
        'city_name': itemDetail.address.city_name // aditional
      });
    });

    return modifyItemsList;
  }

  formatterItem(itemData) {
    const modifyItem = {
      'author': {
        name: 'Matias',
        lastname: 'Millain'
      },
      'item': {
        'id': itemData.id,
        'title': itemData.title,
        'price': {
          'currency': itemData.currency_id,
          'amount': itemData.price,
          'decimals': 2
        },
        'picture': (itemData.pictures.length > 0) ? itemData.pictures[0].url : 'assets/images/none_img.jpg',
        'condition': itemData.condition,
        'free_shipping': itemData.shipping.free_shipping,
        'sold_quantity': itemData.sold_quantity,
        'category_id': itemData.category_id, // aditional
        'permalink': itemData.permalink // aditional
      }
    };

    return modifyItem;
  }

  private errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }

}
