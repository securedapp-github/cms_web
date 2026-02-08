import api from './api';

// Platform Metrics
export const getPlatformMetrics = async () => {
  const response = await api.get('/platform-metrics');
  return response.data;
};

// User Role Management (Super Admin Only)
export const getUsersWithRoles = async (params?: {
  page?: number;
  limit?: number;
  searchterm?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.searchterm) queryParams.append('searchterm', params.searchterm);

  const queryString = queryParams.toString();
  const url = queryString ? `/users-with-roles?${queryString}` : '/users-with-roles';
  
  const response = await api.get(url);
  return response.data;
};

export const assignRole = async (email: string, role: string) => {
  const response = await api.post('/assign-role', { email, role });
  return response.data;
};

export const removeRole = async (email: string, role: string) => {
  const response = await api.delete('/remove-role', { data: { email, role } });
  return response.data;
};

// Fiduciary Management
export const getFiduciaries = async (params?: {
  page?: number;
  limit?: number;
  searchterm?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.searchterm) queryParams.append('searchterm', params.searchterm);

  const queryString = queryParams.toString();
  const url = queryString ? `/fiduciaries?${queryString}` : '/fiduciaries';
  
  const response = await api.get(url);
  return response.data;
};

export const updateFiduciaryStatus = async (id: number, status: string) => {
  const response = await api.put(`/fiduciaries/${id}/status`, { status });
  return response.data;
};

// Feedback Management
export const getFeedbacks = async (params?: {
  page?: number;
  limit?: number;
  searchterm?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.searchterm) queryParams.append('searchterm', params.searchterm);

  const queryString = queryParams.toString();
  const url = queryString ? `/feedbacks?${queryString}` : '/feedbacks';
  
  const response = await api.get(url);
  return response.data;
};

export const sendFeedbackResponse = async (feedbackId: number, response: string) => {
  const responseData = await api.post('/feedback-response', { feedbackId, response });
  return responseData.data;
};

export default {
  getPlatformMetrics,
  getUsersWithRoles,
  assignRole,
  removeRole,
  getFiduciaries,
  updateFiduciaryStatus,
  getFeedbacks,
  sendFeedbackResponse,
};
