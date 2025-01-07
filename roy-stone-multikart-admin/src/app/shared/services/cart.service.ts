import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { CartModel, CartAddOrUpdate } from "../interface/cart.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartModel> {
    return this.http.get<CartModel>(`${environment.URL}/cart`);
  }

  addToCart(payload: CartAddOrUpdate): Observable<CartModel> {
    return this.http.post<CartModel>(`${environment.URL}/cart`, payload);
  }

  updateCart(payload: CartAddOrUpdate): Observable<CartModel> {
    return this.http.put<CartModel>(`${environment.URL}/cart`, payload);
  }

  deleteCart(id: Number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/cart/${id}`);
  }

}
