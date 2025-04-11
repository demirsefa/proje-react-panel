import { GetDataForList, PaginationParams, PaginatedResponse, OnSubmitFN } from "proje-react-panel";
import { getAxiosInstance } from "./apiConfig";
import { AnyClass } from "../types/AnyClass";
export interface UpdateData<T> {
	[key: string]: any;
}

export function getAll<T>(endpoint: string): GetDataForList<T> {
	return async (params: PaginationParams): Promise<PaginatedResponse<T>> => {
		const axiosInstance = getAxiosInstance();
		const { page = 1, limit = 10 } = params;
		const response = await axiosInstance.get<T[]>(`/${endpoint}`, {
			params: { page, limit },
		});
		return {
			data: response.data,
			total: response.data.length,
			page,
			limit,
		};
	};
}

export async function getOne<T>(endpoint: string, id: number): Promise<T> {
	const axiosInstance = getAxiosInstance();
	const response = await axiosInstance.get<T>(`/${endpoint}/${id}`);
	return response.data;
}

export function create<T extends AnyClass>(endpoint: string): OnSubmitFN<T> { 
	return async (data: T): Promise<T> => {
		console.log("create", data);	
		const axiosInstance = getAxiosInstance();
		await axiosInstance.post<T>(`/${endpoint}`, data);
		return data;
	};
}

export async function update<T>(endpoint: string, id: number, data: UpdateData<T>): Promise<T> {
	const axiosInstance = getAxiosInstance();
	const response = await axiosInstance.put<T>(`/${endpoint}/${id}`, data);
	return response.data;
}

export async function remove<T>(endpoint: string, id: number): Promise<void> {
	const axiosInstance = getAxiosInstance();
	await axiosInstance.delete(`/${endpoint}/${id}`);
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
