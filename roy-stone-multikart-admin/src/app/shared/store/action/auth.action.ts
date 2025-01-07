import { 
  AuthUserForgotModel, 
  AuthUserStateModel, 
  UpdatePasswordModel, 
  VerifyEmailOtpModel 
} from "../../interface/auth.interface";

export class Login {
  static readonly type = "[Auth] Login";
  constructor(public payload: AuthUserStateModel) {}
}

export class ForgotPassWord {
  static readonly type = "[Auth] Forgot";
  constructor(public payload: AuthUserForgotModel) {}
}

export class VerifyEmailOtp {
  static readonly type = "[Auth] VerifyEmailOtp";
  constructor(public payload: VerifyEmailOtpModel) {}
}

export class UpdatePassword {
  static readonly type = "[Auth] UpdatePassword";
  constructor(public payload: UpdatePasswordModel) {}
}

export class Logout {
  static readonly type = "[Auth] Logout";
}

export class AuthClear {
  static readonly type = "[Auth] Clear";
}

