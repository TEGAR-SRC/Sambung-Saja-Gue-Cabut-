import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Category, CategoryModel } from "../interface/category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(payload?: Params): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${environment.URL}/category`, { params: payload });
  }

  createCategory(payload: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.URL}/category`, payload);
  }

  editCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.URL}/category/${id}`);
  }

  updateCategory(id: number, payload: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.URL}/category/${id}`, payload);
  }

  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/category/${id}`);
  }

  importCategory(payload: File[]): Observable<Category[]> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`categories`, element, element.name);
      });
    }
    return this.http.post<Category[]>(`${environment.URL}/category/csv/import`, form);
  }

  exportCategory(): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/category/csv/export`, requestBody, {
      responseType: 'blob' as 'json'
    });
  }

}
