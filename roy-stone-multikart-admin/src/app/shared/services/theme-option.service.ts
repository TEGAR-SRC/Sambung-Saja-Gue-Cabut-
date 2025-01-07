import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { ThemeOption } from '../interface/theme-option.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeOptionService {

  constructor(private http: HttpClient) { }

  getThemeOption(): Observable<ThemeOption> {
    return this.http.get<ThemeOption>(`${environment.URL}/themeOptions`);
  }

  updateThemeOption(payload: Params): Observable<ThemeOption> {
    return this.http.put<ThemeOption>(`${environment.URL}/themeOptions`, payload);
  }
}
