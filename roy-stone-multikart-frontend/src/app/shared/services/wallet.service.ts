import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Wallet } from '../interface/wallet.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {}

  getUserTransaction(payload?: Params): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.URL}/wallet/consumer`, { params: payload });
  }
}
