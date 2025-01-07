import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { Themes, ThemesModel } from '../interface/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes(): Observable<ThemesModel> {
    return this.http.get<ThemesModel>(`${environment.URL}/theme`);
  }

  updateTheme(id: number, status: number | boolean): Observable<Themes> {
    return this.http.put<Themes>(`${environment.URL}/theme/${id}`, { status: status });
  }

  getHomePage(payload?: Params): Observable<any> {
    const requestOptions = {
      params: payload,
    };
    return this.http.get(`${environment.URL}/home`, requestOptions);
  }
  
  updateHomePage(id: number, payload: Params) {
    return this.http.put(`${environment.URL}/home/${id}`, payload);
  }

}
