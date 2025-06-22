import { LoginForm, LoginResponse } from "../types/Login";
import { getAxiosInstance } from "./apiConfig";

export async function login(data: LoginForm | FormData): Promise<LoginResponse> {
	const axiosInstance = getAxiosInstance();
	const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
	return response.data;
}
