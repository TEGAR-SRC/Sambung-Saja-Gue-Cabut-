import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Brand, BrandModel } from "../interface/brand.interface";

@Injectable({
  providedIn: "root",
})
export class BrandService {

  constructor(private http: HttpClient) {}

  getBrands(payload?: Params): Observable<BrandModel> {
    return this.http.get<BrandModel>(`${environment.URL}/brand`, { params: payload });
  }

  createBrand(payload: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${environment.URL}/brand`, payload);
  }

  editBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${environment.URL}/brand/${id}`);
  }

  updateBrand(id: number, payload: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${environment.URL}/brand/${id}`, payload);
  }

  updateBrandStatus(id: number, status: boolean): Observable<Brand> {
    return this.http.put<Brand>(`${environment.URL}/brand/${id}/${status}`, {});
  }

  deleteBrand(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/brand/${id}`);
  }

  deleteAllBrand(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/brand/deleteAll`, { ids: ids });
  }

  importBrand(payload: File[]): Observable<Brand[]> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`brands`, element, element.name);
      });
    }
    return this.http.post<Brand[]>(`${environment.URL}/brand/csv/import`, form);
  }

  exportBrand(): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/brand/csv/export`, requestBody, {
      responseType: 'blob' as 'json'
    });
  }

}
