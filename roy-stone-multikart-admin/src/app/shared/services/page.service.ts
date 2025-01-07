import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Page, PageModel } from "../interface/page.interface";

@Injectable({
  providedIn: "root",
})
export class PageService {

  constructor(private http: HttpClient) {}

  getPages(payload?: Params): Observable<PageModel> {
    return this.http.get<PageModel>(`${environment.URL}/page`, { params: payload });
  }

  createPage(payload: Page): Observable<Page> {
    return this.http.post<Page>(`${environment.URL}/page`, payload);
  }

  editPage(id: number): Observable<Page> {
    return this.http.get<Page>(`${environment.URL}/page/${id}`);
  }

  updatePage(id: number, payload: Page): Observable<Page> {
    return this.http.put<Page>(`${environment.URL}/page/${id}`, payload);
  }

  updatePageStatus(id: number, status: boolean): Observable<Page> {
    return this.http.put<Page>(`${environment.URL}/page/${id}/${status}`, {});
  }

  deletePage(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/page/${id}`);
  }

  deleteAllPage(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/page/deleteAll`, {ids: ids});
  }

}
