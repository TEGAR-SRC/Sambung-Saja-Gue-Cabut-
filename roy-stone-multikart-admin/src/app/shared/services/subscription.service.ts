import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { SubscriptionModel } from '../interface/subscription.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) {}

  getSubscribeList(payload?: Params): Observable<SubscriptionModel> {
    return this.http.get<SubscriptionModel>(`${environment.URL}/subscribe`, { params: payload });
  }

}
