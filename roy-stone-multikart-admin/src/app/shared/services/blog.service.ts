import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Blog, BlogModel } from "../interface/blog.interface";

@Injectable({
  providedIn: "root",
})
export class BlogService {

  constructor(private http: HttpClient) {}

  getBlogs(payload?: Params): Observable<BlogModel> {
    return this.http.get<BlogModel>(`${environment.URL}/blog`, { params: payload });
  }

  createBlog(payload: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${environment.URL}/blog`, payload);
  }

  editBlog(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${environment.URL}/blog/${id}`);
  }

  updateBlog(id: number, payload: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${environment.URL}/blog/${id}`, payload);
  }

  updateBlogStatus(id: number, status: boolean): Observable<Blog> {
    return this.http.put<Blog>(`${environment.URL}/blog/${id}/${status}`, {});
  }

  deleteBlog(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/blog/${id}`);
  }

  deleteAllBlog(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/blog/deleteAll`, {ids: ids});
  }

}
