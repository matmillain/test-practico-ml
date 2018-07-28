import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class ItemsServices {
  urlBase = environment.urlWebApiConfiguracion;
  urlBaseComplementMLA = this.urlBase + environment.urlWebApiSiteMLAComplement;

  constructor(
    private http: HttpClient
  ) { }

  getItemsByQuery(query: string, limit: number) {
    const QUERY = `search?q=${query}&limit=${limit}`;
    const API_URL = this.urlBaseComplementMLA + QUERY;
    return this.http.get(API_URL)
      .pipe(
        tap(
          data => data,
          catchError(this.errorHandler)
        )
      );
  }

  getItemById(id: string) {
    const QUERY = `items/${id}`;
    const API_URL = this.urlBase + QUERY;
    return this.http.get(API_URL)
      .pipe(
        tap(
          data => data,
          catchError(this.errorHandler)
        )
      );
  }

  getItemDescription(id: string) {
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

  getCategoriesById(id: string) {
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

  private errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }

}
