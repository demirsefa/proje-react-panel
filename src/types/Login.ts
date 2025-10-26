export interface LoginResponse<T> {
  access_token: string;
  admin: T;
}

export interface LoginForm {
  username: string;
  password: string;
}
