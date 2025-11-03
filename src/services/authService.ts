import axios from 'axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  type: string;
  token?: string;
}

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to attach token
apiClient.interceptors.request.use(
  (config: any) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        if (!config.headers) config.headers = {} as any;
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Handle FormData
      if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
        if (config.headers) {
          delete config.headers['Content-Type'];
          delete config.headers['content-type'];
        }
      }
    } catch (e) {
      console.error('Error in request interceptor:', e);
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Token management helpers
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Auth service
export const authService = {
  async register(userData: { name: string; email: string; password: string; type: string; phone?: string }): Promise<User> {
    try {
      const response = await apiClient.post<User>('/users/register', userData);
      
      // Store token if returned
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Registration failed';
      throw new Error(errorMessage);
    }
  },

  async login(credentials: { email: string; password: string }): Promise<User> {
    try {
      const response = await apiClient.post<User>('/users/login', credentials);
      
      // Store token if returned
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  logout(): void {
    clearAuthToken();
  },
};