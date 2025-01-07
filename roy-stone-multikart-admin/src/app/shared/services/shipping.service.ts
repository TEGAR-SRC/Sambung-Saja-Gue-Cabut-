import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Shipping, ShippingRule } from "../interface/shipping.interface";

@Injectable({
  providedIn: "root",
})
export class ShippingService {

  constructor(private http: HttpClient) {}

  getShippings(payload?: Params): Observable<Shipping[]> {
    return this.http.get<Shipping[]>(`${environment.URL}/shipping`, { params: payload });
  }

  createShipping(payload: Shipping): Observable<Shipping[]> {
    return this.http.post<Shipping[]>(`${environment.URL}/shipping`, payload);
  }

  editShipping(id: number): Observable<Shipping> {
    return this.http.get<Shipping>(`${environment.URL}/shipping/${id}`);
  }

  updateShipping(id: number, payload: Shipping): Observable<Shipping> {
    return this.http.put<Shipping>(`${environment.URL}/shipping/${id}`, payload);
  }

  deleteShipping(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/shipping/${id}`);
  }

  // For Shipping Rule
  
  createShippingRule(payload: ShippingRule): Observable<ShippingRule> {
    return this.http.post<ShippingRule>(`${environment.URL}/shippingRule`, payload);
  }

  editShippingRule(id: number): Observable<ShippingRule> {
    return this.http.get<ShippingRule>(`${environment.URL}/shippingRule/${id}`);
  }

  updateShippingRule(id: number, payload: ShippingRule): Observable<ShippingRule> {
    return this.http.put<ShippingRule>(`${environment.URL}/shippingRule/${id}`, payload);
  }

  deleteShippingRule(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/shippingRule/${id}`);
  }
  
}
