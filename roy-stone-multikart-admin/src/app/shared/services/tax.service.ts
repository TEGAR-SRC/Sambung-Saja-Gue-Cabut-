import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Tax, TaxModel } from "../interface/tax.interface";

@Injectable({
  providedIn: "root",
})
export class TaxService {

  constructor(private http: HttpClient) {}

  getTaxes(payload?: Params): Observable<TaxModel> {
    return this.http.get<TaxModel>(`${environment.URL}/tax`, { params: payload });
  }

  createTax(payload: Tax): Observable<Tax> {
    return this.http.post<Tax>(`${environment.URL}/tax`, payload);
  }

  editTax(id: number): Observable<Tax> {
    return this.http.get<Tax>(`${environment.URL}/tax/${id}`);
  }

  updateTax(id: number, payload: Tax): Observable<Tax> {
    return this.http.put<Tax>(`${environment.URL}/tax/${id}`, payload);
  }

  updateTaxStatus(id: number, status: boolean): Observable<Tax> {
    return this.http.put<Tax>(`${environment.URL}/tax/${id}/${status}`, {});
  }

  deleteTax(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/tax/${id}`);
  }

  deleteAllTax(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/tax/deleteAll`, { ids: ids });
  }

}
