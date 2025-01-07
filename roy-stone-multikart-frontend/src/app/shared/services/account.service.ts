import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountUser, AccountUserUpdatePassword } from '../interface/account.interface';
import { environment } from '../../../environments/environment';
import { UserAddress } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isOpenMenu: boolean = false;

  constructor(private http: HttpClient) {}


  getUserDetails(): Observable<any> {
    return this.http.get<AccountUser>(`${environment.URL}/self`);
  }

  updateProfile(payload: AccountUser): Observable<AccountUser> {
    return this.http.post<AccountUser>(`${environment.URL}/updateProfile`, payload);
  }

  updatePassword(payload: AccountUserUpdatePassword): Observable<AccountUserUpdatePassword> {
    return this.http.put<AccountUserUpdatePassword>(`${environment.URL}/updatePassword`, payload);
  }

  createAddress(payload: UserAddress): Observable<UserAddress> {
    return this.http.post<UserAddress>(`${environment.URL}/address`, payload);
  }

  updateAddress(payload: UserAddress, id: number): Observable<UserAddress> {
    return this.http.put<UserAddress>(`${environment.URL}/address/${id}`, payload);
  }

  deleteAddress(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/address/${id}`);
  }
}
