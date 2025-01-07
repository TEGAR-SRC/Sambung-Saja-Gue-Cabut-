import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { TagModel } from '../interface/tag.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}

  getTags(payload?: Params): Observable<TagModel> {
    return this.http.get<TagModel>(`${environment.URL}/tag`, { params: payload });
  }
}
