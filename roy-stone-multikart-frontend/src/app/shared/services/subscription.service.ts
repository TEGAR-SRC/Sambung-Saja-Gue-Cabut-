import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface Subscription {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) {}

  sendEmail(payload: Subscription) {
    return this.http.post(`${environment.URL}/subscribe`, payload);
  }
}

