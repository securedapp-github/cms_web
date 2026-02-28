import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, ERROR_MESSAGES } from '../utils/constants';
import { storage } from '../utils/storage';
import type { ApiError } from '../types/auth.types';

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken() || storage.session.getToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (!error.response) {
      // Network error
      return Promise.reject({
        success: false,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      });
    }

    const { status, data } = error.response;

    // Handle specific status codes
    switch (status) {
      case 401:
        // Unauthorized - clear auth and redirect to login
        storage.clearAuth();
        window.location.href = '/login';
        return Promise.reject({
          success: false,
          message: data?.message || ERROR_MESSAGES.UNAUTHORIZED,
          status,
        });

      case 400:
        return Promise.reject({
          success: false,
          message: data?.message || ERROR_MESSAGES.VALIDATION_ERROR,
          status,
          errors: data?.errors,
        });

      case 403:
        return Promise.reject({
          success: false,
          message: data?.message || 'Access forbidden',
          status,
        });

      case 404:
        return Promise.reject({
          success: false,
          message: data?.message || 'Resource not found',
          status,
        });

      case 409:
        return Promise.reject({
          success: false,
          message: data?.message || ERROR_MESSAGES.EMAIL_EXISTS,
          status,
        });

      case 500:
      case 502:
      case 503:
      case 504:
        return Promise.reject({
          success: false,
          message: ERROR_MESSAGES.SERVER_ERROR,
          status,
        });

      default:
        return Promise.reject({
          success: false,
          message: data?.message || 'An error occurred',
          status,
        });
    }
  }
);

export default api;
