import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

export interface ApiConfig {
  baseUrl: string;
}

export function initApi(config: ApiConfig): void {
  axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        setAuthLogout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

export function initAuthToken(): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export function setAuthToken(token: string): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
}

export function setAuthLogout(): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  axiosInstance.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('token');
}

export function getAxiosInstance(): AxiosInstance {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  return axiosInstance;
}

// Export the axios instance for external use
export { axiosInstance };
