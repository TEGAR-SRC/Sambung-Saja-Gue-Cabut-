import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../interface/payment-details.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  constructor(private http: HttpClient) {}

  getPaymentAccount(): Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(`${environment.URL}/paymentAccount`);
  }

  updatePaymentAccount(payload: PaymentDetails): Observable<PaymentDetails> {
    return this.http.post<PaymentDetails>(`${environment.URL}/paymentAccount`, payload);
  }
}
