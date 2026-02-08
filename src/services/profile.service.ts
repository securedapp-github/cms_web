import api from './api';
import type { ApiResponse } from '../types/fiduciary.types';

interface ProfileResponse {
  success: boolean;
  message: string;
  profile?: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    language: string;
    dob: string;
    gender: string;
    role: string;
    status: string;
  };
}

// User Profile API
export const updateUserProfile = async (data: {
  name: string;
  mobile: string;
  language: string;
  dob: string;
  gender: string;
}): Promise<ApiResponse> => {
  const response = await api.put('/user-profile', data);
  return response.data;
};

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get('/user-profile');
  return response.data;
};
