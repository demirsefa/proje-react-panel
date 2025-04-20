import {
	GetDataForList,
	PaginatedResponse,
	OnSubmitFN,
	AnyClass,
	GetDetailsDataFN,
	GetDataParams,
} from "proje-react-panel";
import { getAxiosInstance } from "./apiConfig";

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
	return async (data: T): Promise<T> => {
		const axiosInstance = getAxiosInstance();
		await axiosInstance.post<T>(`/${endpoint}`, data);
		return data;
	};
}

export function update<T>(endpoint: string, key: string = "id"): OnSubmitFN<T> {
	return async (data: T): Promise<T> => {
		const axiosInstance = getAxiosInstance();
		const id = (data as any)[key];
		const response = await axiosInstance.put<T>(`/${endpoint}/${id}`, data);
		return response.data;
	};
}

export function updateSimple<T>(endpoint: string): OnSubmitFN<T> {
	return async (data: T): Promise<T> => {
		const axiosInstance = getAxiosInstance();
		const response = await axiosInstance.put<T>(`/${endpoint}`, data);
		return response.data;
	};
}

export function remove<T>(endpoint: string, key: string = "id"): (data: T) => Promise<void> {
	return async (data: T): Promise<void> => {
		const axiosInstance = getAxiosInstance();
		const id = (data as any)[key];
		await axiosInstance.delete<T>(`/${endpoint}/${id}`);
	};
}

// Example usage:
/*
// Initialize the API
initApi({ baseUrl: 'http://api.example.com' });

// Set auth token if needed
setAuthToken('your-token-here');

// Get all users with pagination
const users = await getAll<User>('users', { page: 1, limit: 10 });

// Get a single user
const user = await getOne<User>('users', 1);

// Create a new user
const newUser = await create<User>('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Update a user
const updatedUser = await update<User>('users', 1, {
  name: 'Jane Doe'
});

// Delete a user
await remove<User>('users', 1);
*/
