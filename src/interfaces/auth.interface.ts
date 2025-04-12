export interface ILoginUser {
  email: string;
  password: string;
}

export interface IChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IForgetPassword {
  email: string;
}

export interface IResetPassword {
  email: string;
  newPassword: string;
}
