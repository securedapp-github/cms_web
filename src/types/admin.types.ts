// Pagination Types
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Platform Metrics Types
export interface RoleMetrics {
  total: number;
  active: number;
  pending: number;
}

export interface PlatformMetrics {
  User: RoleMetrics;
  Fiduciary: RoleMetrics;
  Admin: RoleMetrics;
}

export interface PlatformMetricsResponse {
  success: boolean;
  message: string;
  metrics: PlatformMetrics;
}

// User Role Management Types
export interface AssignedRole {
  role: string;
  assignedAt: string;
  assignedBy: {
    name: string;
    email: string;
  };
}

export interface UserWithRoles {
  id: number;
  name: string;
  email: string;
  mobile: string;
  primaryRole: string;
  additionalRoles: AssignedRole[];
  isSuperAdmin: boolean;
  status: string;
}

export interface UsersWithRolesResponse {
  success: boolean;
  message: string;
  count?: number;
  users?: UserWithRoles[];
  // Support paginated response format
  data?: {
    users: UserWithRoles[];
    count: number;
    pagination: Pagination;
  };
}

export interface AssignRoleRequest {
  email: string;
  role: 'User' | 'Fiduciary' | 'Admin';
}

export interface RemoveRoleRequest {
  email: string;
  role: string;
}

// Fiduciary Management Types
export interface Fiduciary {
  id: number;
  name: string;
  email: string;
  mobile: string;
  status: 'Active' | 'Pending' | 'Suspended' | 'Expired';
}

export interface FiduciariesResponse {
  success: boolean;
  message: string;
  fiduciaries?: Fiduciary[];
  // Support paginated response format
  data?: {
    fiduciaries: Fiduciary[];
    count: number;
    pagination: Pagination;
  };
}

export interface UpdateFiduciaryStatusRequest {
  status: 'Active' | 'Pending' | 'Suspended' | 'Expired';
}

// Feedback Management Types
export interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  category?: 'Technical' | 'General' | 'Complaint' | 'Suggestion';
  response: string | null;
  response_date: string | null;
  created_at: string;
}

export interface FeedbacksResponse {
  success: boolean;
  feedbacks?: Feedback[];
  // Support paginated response format
  data?: {
    feedbacks: Feedback[];
    count: number;
    pagination: Pagination;
  };
}

export interface SendFeedbackResponseRequest {
  feedbackId: number;
  response: string;
}
