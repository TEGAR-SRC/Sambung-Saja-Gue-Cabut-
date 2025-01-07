import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { ReviewModel } from '../interface/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}

  getReviews(payload?: Params): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(`${environment.URL}/review`, { params: payload });
  }

  deleteReview(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/review/${id}`);
  }

  deleteAllReview(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/review/deleteAll`, { ids: ids});
  }
  
}
