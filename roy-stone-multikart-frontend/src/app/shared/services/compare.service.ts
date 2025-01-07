import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompareModel } from '../interface/compare.interface';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) { }

  getComparItems(): Observable<CompareModel> {
    return this.http.get<CompareModel>(`${environment.URL}/compare`);
  }

  addCompar(payload: Params): Observable<CompareModel>{
    return this.http.post<CompareModel>(`${environment.URL}/compare`, { product_id:payload['product'].id } )
  }

  deleteCompar(id: number): Observable<number>{
    return this.http.delete<number>(`${environment.URL}/compare/${id}`)
  }
}
