import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { CheckoutPayload, Order, OrderModel, OrderCheckout } from '../interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  placeOrder(payload: CheckoutPayload): Observable<Order> {
    return this.http.post<Order>(`${environment.URL}/order`, payload);
  }

  updateOrderStatus(id: number, payload: { order_status_id: number, note: string }): Observable<Order> {
    return this.http.put<Order>(`${environment.URL}/order/${id}`, payload);
  }
  
  downloadInvoice(payload?: Params): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/order/invoice`, payload , {
      responseType: 'blob' as 'json'
    });
  }
 
}
