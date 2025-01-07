import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { Refund, RefundModel } from '../interface/refund.interface';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private http: HttpClient) {}

  getRefunds(payload?: Params): Observable<RefundModel> {
    return this.http.get<RefundModel>(`${environment.URL}/refund`, { params: payload });
  }

  updaterefundStatus(id: number, status: string): Observable<Refund> {
    return this.http.put<Refund>(`${environment.URL}/refund/${id}`, { status: status });
  }

}
