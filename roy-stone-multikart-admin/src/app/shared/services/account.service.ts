import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AccountUser, AccountUserUpdatePassword } from "../interface/account.interface";
import { Stores } from "../interface/store.interface";

@Injectable({
  providedIn: "root",
})
export class AccountService {

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<AccountUser> {
    return this.http.get<AccountUser>(`${environment.URL}/self`);
  }

  updateProfile(payload: AccountUser): Observable<AccountUser> {
    return this.http.put<AccountUser>(`${environment.URL}/updateProfile`, payload);
  }

  updatePassword(payload: AccountUserUpdatePassword): Observable<AccountUserUpdatePassword> {
    return this.http.put<AccountUserUpdatePassword>(`${environment.URL}/updatePassword`, payload);
  }

  updateStore(payload: Stores): Observable<Stores> {
    return this.http.put<Stores>(`${environment.URL}/updateStoreProfile`, payload);
  }

}
