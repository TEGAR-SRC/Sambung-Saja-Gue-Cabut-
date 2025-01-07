import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Tag, TagModel } from "../interface/tag.interface";

@Injectable({
  providedIn: "root",
})
export class TagService {

  constructor(private http: HttpClient) {}

  getTags(payload?: Params): Observable<TagModel> {
    return this.http.get<TagModel>(`${environment.URL}/tag`, { params: payload });
  }

  createTag(payload: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${environment.URL}/tag`, payload);
  }

  editTag(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${environment.URL}/tag/${id}`);
  }

  updateTag(id: number, payload: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${environment.URL}/tag/${id}`, payload);
  }

  updateTagStatus(id: number, status: boolean): Observable<Tag> {
    return this.http.put<Tag>(`${environment.URL}/tag/${id}/${status}`, {});
  }

  deleteTag(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/tag/${id}`);
  }

  deleteAllTag(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/tag/deleteAll`, { ids: ids });
  }

  importTag(payload: File[]): Observable<Tag[]> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`tags`, element, element.name);
      });
    }
    return this.http.post<Tag[]>(`${environment.URL}/tag/csv/import`, form);
  }

  exportTag(): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/tag/csv/export`, requestBody, {
      responseType: 'blob' as 'json'
    });
  }

}
