import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Menu, MenuModel } from '../interface/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}

  getMenu(payload?: Params): Observable<MenuModel> {
    return this.http.get<MenuModel>(`${environment.URL}/menu`, { params: payload });
  }

  createMenu(payload: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${environment.URL}/menu`, payload);
  }

  editMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${environment.URL}/menu/${id}`);
  }

  updateMenu(id: number, payload: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${environment.URL}/menu/${id}`, payload);
  }

  updateSortMenu(payload: Params): Observable<MenuModel> {
    return this.http.post<MenuModel>(`${environment.URL}/menu/sort`, payload);
  }

  deleteMenu(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/menu/${id}`);
  }

}
