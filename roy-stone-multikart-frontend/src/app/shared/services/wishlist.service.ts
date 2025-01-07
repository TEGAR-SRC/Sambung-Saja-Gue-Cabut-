import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistModel } from '../interface/wishlist.interface';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) { }

  getWishlistItems(): Observable<WishlistModel> {
    return this.http.get<WishlistModel>(`${environment.URL}/wishlist`);
  }

  addToWishlist(payload: Params): Observable<WishlistModel>{
    return this.http.post<WishlistModel>(`${environment.URL}/wishlist`, payload )
  }

  deleteWishlist(id: number): Observable<number>{
    return this.http.delete<number>(`${environment.URL}/wishlist/${id}`)
  }
}
