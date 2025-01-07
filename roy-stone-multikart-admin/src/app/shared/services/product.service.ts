import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Product, ProductModel } from "../interface/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(payload?: Params): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.URL}/product`, { params: payload });
  }

  createProduct(payload: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.URL}/product`, payload);
  }

  editProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.URL}/product/${id}`);
  }

  updateProduct(id: number, payload: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.URL}/product/${id}`, payload);
  }

  updateProductStatus(id: number, status: boolean): Observable<Product> {
    return this.http.put<Product>(`${environment.URL}/product/${id}/${status}`, {});
  }

  approveProductStatus(id: number, status: boolean): Observable<Product> {
    return this.http.put<Product>(`${environment.URL}/product/approve/${id}/${status}`, {});
  }

  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/product/${id}`);
  }

  deleteAllProduct(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/product/deleteAll`, {ids: ids});
  }

  replicateProduct(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/product/replicate`, {ids: ids});
  }

  importProduct(payload: File[]): Observable<Product[]> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`products`, element, element.name);
      });
    }
    return this.http.post<Product[]>(`${environment.URL}/product/csv/import`, form);
  }

  exportProduct(payload?: Params): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/product/csv/export`, payload , {
      responseType: 'blob' as 'json'
    });
  }

  download(payload: { product_id: number, variation_id?: number | null }): Observable<{download_link: string}> {
    return this.http.post<{download_link: string}>(`${environment.URL}/download/admin/zip/link`, payload);
  }

}
