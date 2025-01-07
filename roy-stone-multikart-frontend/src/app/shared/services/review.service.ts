import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Review, ReviewModel } from '../interface/review.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}

  getReview(slug: Params): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(`${environment.URL}/front/review`,  { params: slug });
  }

  sendReview(payload: Params): Observable<Review> {
    return this.http.post<Review>(`${environment.URL}/review`, payload);
  }

  updateReview(id:number, payload: Params): Observable<Review> {
    return this.http.put<Review>(`${environment.URL}/review/${id}`, payload);
  }
}
