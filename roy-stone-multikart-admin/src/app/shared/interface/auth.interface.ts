import { Permission } from "./role.interface";

export interface AuthUserStateModel {
  email: string;
  password: string;
}

export interface AuthModel {
  email: string;
  token: string | number;
  access_token: string | null;
  permissions: Permission[];
}

export interface AuthUserForgotModel {
  email: string;
}

export interface VerifyEmailOtpModel {
  email: string;
  token: number;
}

export interface UpdatePasswordModel {
  password: string;
  password_confirmation: string;
  email: string;
  token: number;
}
