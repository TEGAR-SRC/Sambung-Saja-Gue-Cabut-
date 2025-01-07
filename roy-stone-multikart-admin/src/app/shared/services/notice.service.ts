import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '../interface/core.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Notice, NoticeModel } from '../interface/notice.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private http: HttpClient) {}
  
  getNotice(payload?: Params): Observable<NoticeModel> {
    return this.http.get<NoticeModel>(`${environment.URL}/notice`, { params: payload });
  }
 
  createNotice(payload: Notice): Observable<Notice> {
    return this.http.post<Notice>(`${environment.URL}/notice`, payload);
  }

  editNotice(id: number | string): Observable<Notice> {
    return this.http.get<Notice>(`${environment.URL}/notice/${id}`);
  }

  updateNotice(id: number, payload: Notice): Observable<Notice> {
    return this.http.put<Notice>(`${environment.URL}/notice/${id}`, payload);
  }

  markAsRead(id: number): Observable<Notice> {
    return this.http.put<Notice>(`${environment.URL}/notice/markAsRead/${id}`, {});
  }

  deleteNotice(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/notice/${id}`);
  }
 

}
