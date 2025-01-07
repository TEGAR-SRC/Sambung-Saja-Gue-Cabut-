import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutPayload, Order, OrderCheckout, OrderModel, PlaceOrder, RePaymentPayload } from '../interface/order.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getOrders(payload?: Params): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${environment.URL}/order`, { params: payload });
  }

  viewOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.URL}/order/${id}`);
  }

  checkout(payload: CheckoutPayload): Observable<OrderCheckout> {
    return this.http.post<OrderCheckout>(`${environment.URL}/checkout`, payload);
  }

  placeOrder(payload: CheckoutPayload): Observable<PlaceOrder> {
    return this.http.post<PlaceOrder>(`${environment.URL}/order`, payload);
  }

  rePayment(payload: RePaymentPayload): Observable<PlaceOrder> {
    return this.http.post<PlaceOrder>(`${environment.URL}/rePayment`, payload);
  }

  orderTracking(payload: { order_number: string, email_or_phone: string }): Observable<Order> {
    return this.http.get<Order>(`${environment.URL}/trackOrder`, { params: payload });
  }

  downloadInvoice(payload?: Params): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/order/invoice`, payload , {
      responseType: 'blob' as 'json'
    });
  }

}
