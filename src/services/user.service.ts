import api from './api';
import type {
  GetConsentsParams,
  GetConsentsResponse,
  ConsentStatus,
  ApiResponse,
  GetNotificationsResponse,
  GetFiduciaryDetailsResponse,
} from '../types/user.types';

// User Consent APIs
export const getUserConsents = async (params?: GetConsentsParams): Promise<GetConsentsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.searchterm) queryParams.append('searchterm', params.searchterm);
  if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom);
  if (params?.dateTo) queryParams.append('dateTo', params.dateTo);
  if (params?.fiduciaryId) queryParams.append('fiduciaryId', params.fiduciaryId.toString());
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const endpoint = queryParams.toString() ? `/user-consents?${queryParams}` : '/user-consents';
  const response = await api.get(endpoint);
  return response.data;
};

export const updateUserConsentStatus = async (
  consentId: number,
  status: ConsentStatus
): Promise<ApiResponse> => {
  const response = await api.put(`/user-consent/${consentId}`, { 
    status,
    is_read: 1 
  });
  return response.data;
};

// Notifications APIs
export const getUserNotifications = async (): Promise<GetNotificationsResponse> => {
  const response = await api.get('/user-notifications');
  return response.data;
};

export const updateNotificationAction = async (
  consentId: number,
  isRead: number
): Promise<ApiResponse> => {
  const response = await api.put(`/user-consent/${consentId}`, { 
    is_read: isRead 
  });
  return response.data;
};

// Fiduciary Details API
export const getFiduciaryDetails = async (fiduciaryId: number): Promise<GetFiduciaryDetailsResponse> => {
  const response = await api.get(`/fiduciary/${fiduciaryId}/details`);
  return response.data;
};

