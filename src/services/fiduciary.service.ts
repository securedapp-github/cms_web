import api from './api';
import type {
  ConsentsResponse,
  WebhooksResponse,
  ApiKeysResponse,
  CreateApiKeyResponse,
  PurposeCodesResponse,
  EventsResponse,
  FeedbackRequest,
  ApiResponse,
  AddDPORequest,
  UpdateDPORequest,
  AddDPOResponse,
  UpdateDPOResponse,
  DeleteDPOResponse,
  GetDPOsResponse,
} from '../types/fiduciary.types';

// Consent Management APIs
export const getMyConsentRequests = async (filters?: {
  status?: string;
  userEmail?: string;
  search?: string;
  searchterm?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}): Promise<ConsentsResponse> => {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters?.userEmail) params.append('userEmail', filters.userEmail);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.searchterm) params.append('searchterm', filters.searchterm);
  if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
  if (filters?.dateTo) params.append('dateTo', filters.dateTo);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/my-consent-requests?${params.toString()}`);
  return response.data;
};

export const updateConsentStatus = async (data: {
  consentId: number;
  status: string;
}): Promise<ApiResponse> => {
  const response = await api.put(`/consent-requests/${data.consentId}/status`, {
    status: data.status,
  });
  return response.data;
};

// Webhook Management APIs
export const getWebhooks = async (filters?: {
  page?: number;
  limit?: number;
}): Promise<WebhooksResponse> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/webhooks?${params.toString()}`);
  return response.data;
};

export const createWebhook = async (data: {
  url: string;
  events?: string[];
}): Promise<ApiResponse> => {
  const response = await api.post('/webhooks', data);
  return response.data;
};

export const updateWebhookStatus = async (data: {
  id: number;
  status: string;
}): Promise<ApiResponse> => {
  const response = await api.put(`/webhooks/${data.id}/status`, {
    status: data.status,
  });
  return response.data;
};

export const deleteWebhook = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete(`/webhooks/${id}`);
  return response.data;
};

// API Key Management APIs
export const getApiKeys = async (filters?: {
  page?: number;
  limit?: number;
}): Promise<ApiKeysResponse> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/api-keys?${params.toString()}`);
  return response.data;
};

export const createApiKey = async (data: {
  keyName: string;
  environment: 'live' | 'test';
}): Promise<CreateApiKeyResponse> => {
  const response = await api.post('/api-keys', data);
  return response.data;
};

export const getApiKeyDetails = async (id: number): Promise<{ success: boolean; key: any }> => {
  const response = await api.get(`/api-keys/${id}`);
  return response.data;
};

export const revokeApiKey = async (id: number): Promise<ApiResponse> => {
  const response = await api.put(`/api-keys/${id}/revoke`);
  return response.data;
};

export const reactivateApiKey = async (id: number): Promise<ApiResponse> => {
  const response = await api.put(`/api-keys/${id}/reactivate`);
  return response.data;
};

export const deleteApiKey = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete(`/api-keys/${id}/permanent`);
  return response.data;
};

// Purpose Code Management APIs
export const getPurposeCodes = async (filters?: {
  page?: number;
  limit?: number;
}): Promise<PurposeCodesResponse> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/purpose-cards?${params.toString()}`);
  return response.data;
};

export const addPurposeCode = async (data: {
  purpose: string;
  code: number;
}): Promise<ApiResponse> => {
  const response = await api.post('/purpose-card', data);
  return response.data;
};

export const deletePurposeCode = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete(`/purpose-cards/${id}`);
  return response.data;
};

// Events APIs
export const getFiduciaryEvents = async (filters?: {
  status?: string;
  searchterm?: string;
  page?: number;
  limit?: number;
}): Promise<EventsResponse> => {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters?.searchterm) params.append('searchterm', filters.searchterm);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/fiduciary-events?${params.toString()}`);
  return response.data;
};

// Feedback API
export const submitFeedback = async (data: FeedbackRequest): Promise<ApiResponse> => {
  const response = await api.post('/feedback', data);
  return response.data;
};

// DPO (Data Protection Officer) APIs
export const addDPO = async (data: AddDPORequest): Promise<AddDPOResponse> => {
  const response = await api.post('/dpo', data);
  return response.data;
};

export const updateDPO = async (id: number, data: UpdateDPORequest): Promise<UpdateDPOResponse> => {
  const response = await api.put(`/dpo/${id}`, data);
  return response.data;
};

export const deleteDPO = async (id: number): Promise<DeleteDPOResponse> => {
  const response = await api.delete(`/dpo/${id}`);
  return response.data;
};

export const getMyDPOs = async (): Promise<GetDPOsResponse> => {
  const response = await api.get('/dpo');
  const data = response.data;
  
  // API returns 'dpos' but our interface expects 'dataProtectionOfficers'
  // Transform the response to match our interface
  if (data.success && data.dpos) {
    return {
      success: data.success,
      message: data.message,
      dataProtectionOfficers: data.dpos,
    };
  }
  
  return data;
};
