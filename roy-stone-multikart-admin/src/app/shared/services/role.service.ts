import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Role, RoleModel, Module } from "../interface/role.interface";

@Injectable({
  providedIn: "root",
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getRoleModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.URL}/module`);
  }

  getRoles(payload?: Params): Observable<RoleModel> {
    return this.http.get<RoleModel>(`${environment.URL}/role`, { params: payload });
  }

  createRole(payload: Role): Observable<Role> {
    return this.http.post<Role>(`${environment.URL}/role`, payload);
  }

  editRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.URL}/role/${id}`);
  }

  updateRole(id: number, payload: Role): Observable<Role> {
    return this.http.put<Role>(`${environment.URL}/role/${id}`, payload);
  }

  deleteRole(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/role/${id}`);
  }

  deleteAllRole(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/role/deleteAll`, { ids: ids});
  }

}
