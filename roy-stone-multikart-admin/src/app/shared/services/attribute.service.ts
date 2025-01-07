import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Attribute, AttributeModel, AttributeValueModel } from "../interface/attribute.interface";

@Injectable({
  providedIn: "root",
})
export class AttributeService {

  constructor(private http: HttpClient) {}

  getAttributes(payload?: Params): Observable<AttributeModel> {
    return this.http.get<AttributeModel>(`${environment.URL}/attribute`, { params: payload });
  }

  getAttributeValues(payload?: Params): Observable<AttributeValueModel> {
    return this.http.get<AttributeValueModel>(`${environment.URL}/attribute-value`, { params: payload });
  }

  createAttribute(payload: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(`${environment.URL}/attribute`, payload);
  }

  editAttribute(id: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${environment.URL}/attribute/${id}`);
  }

  updateAttribute(id: number, payload: Attribute): Observable<Attribute> {
    return this.http.put<Attribute>(`${environment.URL}/attribute/${id}`, payload);
  }

  updateAttributeStatus(id: number, status: boolean): Observable<Attribute> {
    return this.http.put<Attribute>(`${environment.URL}/attribute/${id}/${status}`, {});
  }

  deleteAttribute(id: number): Observable<number> {
    return this.http.delete<number> (`${environment.URL}/attribute/${id}`);
  }

  deleteAllAttribute(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/attribute/deleteAll`, { ids: ids});
  }

  importAttribute(payload: File[]): Observable<Attribute[]> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`attributes`, element, element.name);
      });
    }
    return this.http.post<Attribute[]>(`${environment.URL}/attribute/csv/import`, form);
  }

  exportAttribute(): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/attribute/csv/export`, requestBody, {
      responseType: 'blob' as 'json'
    });
  }

}
