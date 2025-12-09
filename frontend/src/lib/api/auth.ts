import apiClient, { handleApiResponse, handleApiError } from '@/lib/api-client';
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/api';

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const data = handleApiResponse<AuthResponse>(response);
      return data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const data = handleApiResponse<AuthResponse>(response);
      return data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    try {
      const response = await apiClient.post('/auth/refresh', { refreshToken });
      const data = handleApiResponse<{ accessToken: string }>(response);
      return data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get('/users/profile');
      const data = handleApiResponse<User>(response);
      return data.data || data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Verify if user is authenticated
   */
  verifyAuth: async (): Promise<boolean> => {
    try {
      await apiClient.get('/users/profile');
      return true;
    } catch (error) {
      return false;
    }
  },
};
