import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { Withdrawal, WithdrawalModel } from '../interface/withdrawal.interface';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(private http: HttpClient) {}

  getWithdrawRequest(payload?: Params): Observable<WithdrawalModel> {
    return this.http.get<WithdrawalModel>(`${environment.URL}/withdrawRequest`, { params: payload });
  }

  updateWithdrawStatus(id: number, status: boolean): Observable<Withdrawal> {
    return this.http.put<Withdrawal>(`${environment.URL}/withdrawRequest/${id}`, { status: status });
  }

  withdrawRequest(payload: Params): Observable<Withdrawal> {
    return this.http.post<Withdrawal>(`${environment.URL}/withdrawRequest`, payload);
  }
  
}
