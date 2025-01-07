import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemesModel } from '../interface/theme.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes(): Observable<ThemesModel> {
    return this.http.get<ThemesModel>(`${environment.URL}/theme`);
  }

  getHomePage(slug?: string): Observable<any> {
    return this.http.get(`${environment.URL}/home?slug=${slug}`);
  }
}
