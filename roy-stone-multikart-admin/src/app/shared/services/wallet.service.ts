import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Wallet } from "../interface/wallet.interface";

@Injectable({
  providedIn: "root",
})
export class WalletService {

  constructor(private http: HttpClient) {}

  getUserTransaction(payload?: Params): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.URL}/wallet/consumer`, { params: payload });
  }

  credit(payload: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${environment.URL}/credit/wallet`, payload);
  }

  debit(payload: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${environment.URL}/debit/wallet`, payload);
  }

}
