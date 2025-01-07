import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Stores, StoresModel } from '../interface/store.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getStores(payload?: Params): Observable<StoresModel> {
    return this.http.get<StoresModel>(`${environment.URL}/store`, { params: payload });
  }

  getStoreBySlug(slug: string): Observable<Stores> {
    return this.http.get<Stores>(`${environment.URL}/store/slug/${slug}`);
  }
}
