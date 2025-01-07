import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { OtpComponent } from "./otp/otp.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";

export const auth: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "otp",
    component: OtpComponent,
  },
  {
    path: "update-password",
    component: UpdatePasswordComponent,
  }
];