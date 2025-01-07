import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Currency, CurrencyModel } from "../interface/currency.interface";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  getCurrencies(payload?: Params): Observable<CurrencyModel> {
    return this.http.get<CurrencyModel>(`${environment.URL}/currency`, { params: payload });
  }

  createCurrency(payload: Currency): Observable<Currency> {
    return this.http.post<Currency>(`${environment.URL}/currency`, payload);
  }

  editCurrency(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${environment.URL}/currency/${id}`);
  }

  updateCurrency(id: number, payload: Currency): Observable<Currency> {
    return this.http.put<Currency>(`${environment.URL}/currency/${id}`, payload);
  }

  updateCurrencyStatus(id: number, status: boolean): Observable<Currency> {
    return this.http.put<Currency>(`${environment.URL}/currency/${id}/${status}`, {});
  }

  deleteCurrency(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/currency/${id}`);
  }

  deleteAllCurrency(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/currency/deleteAll`, {ids: ids});
  }

}
