import { LoginForm, LoginResponse } from '../types/Login';
import { getAxiosInstance } from './ApiConfig';

export async function login<T>(data: LoginForm | FormData): Promise<LoginResponse<T>> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<LoginResponse<T>>('/auth/login', data);
  return response.data;
}
