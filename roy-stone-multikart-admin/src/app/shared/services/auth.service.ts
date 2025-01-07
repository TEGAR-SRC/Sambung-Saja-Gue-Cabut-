import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthUserForgotModel, AuthUserStateModel, UpdatePasswordModel, VerifyEmailOtpModel } from "../interface/auth.interface";
import { AuthModel } from "../interface/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(payload: AuthUserStateModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${environment.URL}/login`, payload);
  }

  forgotPassword(payload: AuthUserForgotModel) {
    return this.http.post(`${environment.URL}/forgot-password`, payload);
  }

  verifyEmailOtp(payload: VerifyEmailOtpModel) {
    return this.http.post(`${environment.URL}/verify-token`, payload);
  }

  updatePassword(payload: UpdatePasswordModel) {
    return this.http.post(`${environment.URL}/update-password`, payload);
  }

  logout() {
    return this.http.post<string>(`${environment.URL}/logout`, {});
  }

}
