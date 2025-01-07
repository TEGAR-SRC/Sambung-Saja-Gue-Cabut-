import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderStatusModel } from '../interface/order-status.interface';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) {}

  getOrderStatus(payload?: Params): Observable<OrderStatusModel> {
    return this.http.get<OrderStatusModel>(`${environment.URL}/orderStatus`, { params: payload });
  }
  
}
