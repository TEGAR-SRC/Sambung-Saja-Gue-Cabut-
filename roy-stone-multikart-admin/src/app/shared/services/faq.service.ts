import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { Faq, FaqModel } from '../interface/faq.interface';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {}

  getFaqs(payload?: Params): Observable<FaqModel> {
    return this.http.get<FaqModel>(`${environment.URL}/faq`, { params: payload });
  }

  createFaq(payload: Faq): Observable<Faq> {
    return this.http.post<Faq>(`${environment.URL}/faq`, payload);
  }

  editFaq(id: number): Observable<Faq> {
    return this.http.get<Faq>(`${environment.URL}/faq/${id}`);
  }

  updateFaq(id: number, payload: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${environment.URL}/faq/${id}`, payload);
  }

  updateFaqStatus(id: number, status: boolean): Observable<Faq> {
    return this.http.put<Faq>(`${environment.URL}/faq/${id}/${status}`, {});
  }

  deleteFaq(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/faq/${id}`);
  }

  deleteAllFaq(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/faq/deleteAll`, { ids: ids});
  }

}
