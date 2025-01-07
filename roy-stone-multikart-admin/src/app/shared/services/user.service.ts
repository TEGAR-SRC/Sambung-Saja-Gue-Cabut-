import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { User, UserAddress, UserModel } from "../interface/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(payload?: Params): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.URL}/user`, { params: payload });
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(`${environment.URL}/user`, payload);
  }

  editUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.URL}/user/${id}`);
  }

  updateUser(id: number, payload: User): Observable<User> {
    return this.http.put<User>(`${environment.URL}/user/${id}`, payload);
  }

  updateUserStatus(id: number, status: boolean): Observable<User> {
    return this.http.put<User>(`${environment.URL}/user/${id}/${status}`, {});
  }

  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/user/${id}`);
  }

  deleteAllUser(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/user/deleteAll`, { ids: ids });
  }

  exportUser(): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/user/csv/export`, requestBody, {
      responseType: 'blob' as 'json'
    });
  }

  importUser(payload: File[]): Observable<User[]> {
    let form = new FormData();
    if(Array.isArray(payload) && payload.length) {
      payload.forEach((element: File, index: number) => {
        form.append(`users`, element, element.name);
      });
    }
    return this.http.post<User[]>(`${environment.URL}/user/csv/import`, form);
  }

  createUserAddress(payload: UserAddress): Observable<User> {
    return this.http.post<User>(`${environment.URL}/address`, payload);
  }

}
