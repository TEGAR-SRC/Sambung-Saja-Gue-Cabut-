import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Attachment, AttachmentModel } from "../interface/attachment.interface";

@Injectable({
  providedIn: "root",
})
export class AttachmentService {

  constructor(private http: HttpClient) {}

  getAttachments(payload?: Params): Observable<AttachmentModel> {
    return this.http.get<AttachmentModel>(`${environment.URL}/attachment`, { params: payload });
  }

  createAttachment(payload: File[]): Observable<Attachment> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`attachments[${index}]`, element, element.name);
      });
    }
    return this.http.post<Attachment>(`${environment.URL}/attachment`, form);
  }

  deleteAttachment(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/attachment/${id}`);
  }

  deleteAllAttachment(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/attachment/deleteAll`, { ids: ids});
  }

}
