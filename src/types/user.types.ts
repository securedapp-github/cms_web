import type { User, UserRole, UserStatus } from './auth.types';

export type { User, UserRole, UserStatus };

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// User Consent Types
export type ConsentStatus = "Active" | "Suspended" | "Expired" | "Revoked" | "Pending" | "pending" | "active" | "suspended" | "expired" | "revoked";

export interface Consent {
  consent_id: number;
  user_id: number;
  fiduciary_id: number;
  fiduciary_name?: string;
  entity: string;
  data: string;
  purpose: string;
  purpose_code: string;
  time_and_date: string;
  expiry: string;
  status: ConsentStatus;
  is_read: number;
}

export interface GetConsentsParams {
  status?: string;
  searchterm?: string;
  dateFrom?: string;
  dateTo?: string;
  fiduciaryId?: number;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface GetConsentsResponse {
  success: boolean;
  message?: string;
  data?: {
    consents: Consent[];
    pagination: PaginationInfo;
  };
  // Legacy support
  consents?: Consent[];
  pagination?: PaginationInfo;
}

export interface UpdateConsentStatusRequest {
  consentId: number;
  status: ConsentStatus;
}

export interface ConsentActionRequest {
  consentId: number;
  action: 'approve' | 'reject';
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

// Notification Types
export interface Notification {
  consent_id: number;
  user_id: number;
  fiduciary_id: number;
  fiduciary_name?: string;
  fiduciary_email?: string;
  entity: string;
  data: string;
  purpose_text?: string;
  purpose_id?: number;
  time_and_date: string;
  expiry: string;
  status: ConsentStatus;
  is_read: number;
}

export interface GetNotificationsResponse {
  success: boolean;
  message: string;
  notifications: Notification[];
}

// Fiduciary Details Types
export interface DPOInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_primary: number;
}

export interface FiduciaryDetails {
  id: number;
  name: string;
  email: string;
  mobile: string;
  status: string;
  dataProtectionOfficers: DPOInfo[];
}

export interface GetFiduciaryDetailsResponse {
  success: boolean;
  message?: string;
  fiduciary: FiduciaryDetails;
}

