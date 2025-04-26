import { GetDataForList, PaginatedResponse, OnSubmitFN, GetDetailsDataFN, GetDataParams } from "proje-react-panel";
import { getAxiosInstance } from "./apiConfig";
import { AxiosError } from "axios";

export function getAll<T>(endpoint: string): GetDataForList<T> {
	return async (params: GetDataParams): Promise<PaginatedResponse<T>> => {
		const axiosInstance = getAxiosInstance();
		const { page = 1, limit = 10 } = params;
		const response = await axiosInstance.get<{
			data: T[];
			total: number;
		}>(`/${endpoint}`, {
			params: { page, limit, ...(params.filters ?? {}) },
		});
		return {
			data: response.data.data,
			total: response.data.total,
			page,
			limit,
		};
	};
}

export function getOne<T>(endpoint: string, key: string = "id"): GetDetailsDataFN<T> {
	return async (params: Record<string, string>): Promise<T> => {
		const axiosInstance = getAxiosInstance();
		const response = await axiosInstance.get<T>(`/${endpoint}/${params[key]}`);
		return response.data;
	};
}

export function create<T>(endpoint: string): OnSubmitFN<T> {
	return async (data: T | FormData): Promise<T | FormData> => {
		const axiosInstance = getAxiosInstance();
		await axiosInstance.post<T>(`/${endpoint}`, data);
		return data;
	};
}

export function createFormData<T>(endpoint: string): OnSubmitFN<T> {
	return async (data: T | FormData): Promise<T | FormData> => {
		const axiosInstance = getAxiosInstance();
		await axiosInstance.post<T>(`/${endpoint}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	};
}

export function update<T>(endpoint: string, key: string = "id"): OnSubmitFN<T> {
	return async (data: T | FormData): Promise<T | FormData> => {
		const axiosInstance = getAxiosInstance();
		const id = (data as any)[key];
		const response = await axiosInstance.put<T>(`/${endpoint}/${id}`, data);
		return response.data;
	};
}

export function updateFormData<T>(endpoint: string, key: string = "id"): OnSubmitFN<T> {
	return async (data: T | FormData): Promise<T | FormData> => {
		const axiosInstance = getAxiosInstance();
		const id = (data as any)[key];
		const response = await axiosInstance.put<T>(`/${endpoint}/${id}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	};
}

export function updateSimple<T>(endpoint: string): OnSubmitFN<T> {
	return async (data: T | FormData): Promise<T | FormData> => {
		const axiosInstance = getAxiosInstance();
		const response = await axiosInstance.put<T>(`/${endpoint}`, data);
		return response.data;
	};
}

export function remove<T>(
	endpoint: string,
	key: string = 'id',
  ): (data: T) => Promise<void> {
	return async (data: T): Promise<void> => {
	  const axiosInstance = getAxiosInstance();
	  const id = (data as any)[key];
	  await axiosInstance
		.delete<T>(`/${endpoint}/${id}`)
		.then((res) => res.data)
		.catch((err: AxiosError) => {
		  const messageError = err.response?.data as { message: string };
		  if (messageError?.message) {
			throw new Error(messageError.message);
		  }
		  throw err;
		});
	};
}
