import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpdatePasswordState, AuthForgotPasswordState, AuthStateModal, AuthUserState, AuthVerifyOTPState, RegisterModal, AuthNumberLoginState, AuthVerifyNumberOTPState } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string | undefined;
  public confirmed: boolean = false;
  public isLogin: boolean = false;

  constructor(private http: HttpClient) { }

  register(payload: RegisterModal): Observable<any>{
    return this.http.post(`${environment.URL}/register`, payload);
  }

  login(payload: AuthUserState): Observable<AuthStateModal>{
    return this.http.post<AuthStateModal>(`${environment.URL}/login`,payload)
  }

  loginWithNumber(payload: AuthNumberLoginState): Observable<AuthStateModal>{
    return this.http.post<AuthStateModal>(`${environment.URL}/login/number`,payload)
  }

  forgotPassword(payload: AuthForgotPasswordState): Observable<AuthForgotPasswordState> {
    return this.http.post<AuthForgotPasswordState>(`${environment.URL}/forgot-password`, payload);
  }

  verifyEmailOtp(payload: AuthVerifyOTPState): Observable<AuthVerifyOTPState> {
    return this.http.post<AuthVerifyOTPState>(`${environment.URL}/verify-token`, payload);
  }

  verifyNumberOtp(payload: AuthVerifyNumberOTPState): Observable<AuthStateModal> {
    return this.http.post<AuthStateModal>(`${environment.URL}/verify-otp`, payload);
  }

  updatePassword(payload: UpdatePasswordState): Observable<UpdatePasswordState> {
    return this.http.post<UpdatePasswordState>(`${environment.URL}/update-password`, payload);
  }

  logout(): Observable<AuthStateModal> {
    return this.http.post<AuthStateModal>(`${environment.URL}/logout`, {});
  }
}
