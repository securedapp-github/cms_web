// Fiduciary-specific types

// Pagination interface
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ConsentRequest {
  id?: number;
  consent_id: number;
  user_id: number;
  user_email: string;
  user_name: string;
  user_mobile?: string;
  fiduciary_id?: number;
  entity?: string;
  data?: string;
  purpose: string;
  purpose_code: string;
  purpose_id?: number;
  purpose_text?: string;
  status: 'requested' | 'active' | 'inactive' | 'revoked' | 'Pending' | 'Active' | 'Inactive' | 'Suspended';
  requested_at: string;
  granted_at: string | null;
  expires_at: string | null;
  expiry?: string;
  created_at?: string;
  time_and_date?: string;
  data_categories?: string[];  // Make optional since API might not always return this
  isActive?: boolean;
  isPending?: boolean;
  isExpired?: boolean;
  isSuspended?: boolean;
  hasBeenRead?: boolean;
  is_read?: number;
}

export interface ConsentCounts {
  total: number;
  pending: number;
  active: number;
  suspended: number;
  expired: number;
}

export interface ConsentsResponse {
  success: boolean;
  message?: string;
  data?: {
    consents?: ConsentRequest[];
    requests?: ConsentRequest[];
    count?: ConsentCounts;
    counts?: ConsentCounts;
    pagination?: Pagination;
    fiduciary?: {
      id: number;
      name: string;
    };
    filters?: {
      status: string;
      page?: number;
      limit?: number;
    };
  };
  // Legacy support
  consents?: ConsentRequest[];
  requests?: ConsentRequest[];
  counts?: ConsentCounts;
  count?: ConsentCounts;
  pagination?: Pagination;
  fiduciary?: {
    id: number;
    name: string;
  };
  filters?: {
    status: string;
  };
}

export interface Webhook {
  id: number;
  url: string;
  status: 'Active' | 'Inactive';
  events: string[];
}

export interface WebhooksResponse {
  success: boolean;
  message?: string;
  data?: {
    webhooks: Webhook[];
    pagination?: Pagination;
  };
  // Legacy support
  webhooks?: Webhook[];
  pagination?: Pagination;
}

export interface ApiKey {
  id: number;
  key_name: string;
  key_prefix: string;
  environment: 'live' | 'test';
  status: 'active' | 'revoked';
  created_at: string;
  last_used_at: string | null;
  usage_count: number;
}

export interface ApiKeysResponse {
  success: boolean;
  message?: string;
  data?: {
    keys: ApiKey[];
    pagination?: Pagination;
  };
  // Legacy support
  keys?: ApiKey[];
  total?: number;
  pagination?: Pagination;
}

export interface CreateApiKeyResponse {
  success: boolean;
  message: string;
  apiKey: string;
  keyName: string;
  environment: 'live' | 'test';
}

export interface PurposeCode {
  id: number;
  purpose: string;
  code: string;
  created_at: string;
}

export interface PurposeCodesResponse {
  success: boolean;
  message?: string;
  data?: {
    purposeCards: PurposeCode[];
    pagination?: Pagination;
  };
  // Legacy support
  purposeCards?: PurposeCode[];
  pagination?: Pagination;
}

export interface FiduciaryEvent {
  consent_id: number;
  user_id: number;
  user_email: string;
  user_name: string;
  user_mobile?: string;
  fiduciary_id: number;
  entity?: string;
  data?: string;
  purpose?: string;
  purpose_text?: string;
  purpose_id?: number;
  purpose_code?: string;
  status: 'Pending' | 'Active' | 'Suspended' | 'Expired' | 'pending' | 'active' | 'suspended' | 'expired';
  time_and_date?: string;
  requested_at?: string;
  granted_at?: string | null;
  expires_at?: string | null;
  expiry?: string;
  suspended_at?: string | null;
  isActive?: boolean;
  isPending?: boolean;
  hasBeenRead?: boolean;
  is_read?: number;
}

export interface EventCounts {
  total: number;
  pending: number;
  active: number;
  suspended: number;
  expired: number;
}

export interface EventsResponse {
  success: boolean;
  message?: string;
  data?: {
    events: FiduciaryEvent[];
    count?: EventCounts;
    counts?: EventCounts;
    pagination?: Pagination;
    filter?: {
      fiduciaryId?: number;
      status?: string;
    };
  };
  // Legacy support
  events?: FiduciaryEvent[];
  counts?: EventCounts;
  count?: EventCounts;
  pagination?: Pagination;
}

export interface FeedbackRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

// DPO (Data Protection Officer) Types
export interface DPO {
  id: number;
  fiduciary_id: number;
  name: string;
  email: string;
  phone: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddDPORequest {
  name: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

export interface UpdateDPORequest {
  name: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

export interface AddDPOResponse {
  success: boolean;
  message: string;
  dpoId?: number;
}

export interface UpdateDPOResponse {
  success: boolean;
  message: string;
}

export interface DeleteDPOResponse {
  success: boolean;
  message: string;
}

export interface GetDPOsResponse {
  success: boolean;
  message?: string;
  dataProtectionOfficers?: DPO[];
}
