export type UserRole = 'Fiduciary' | 'Admin' | 'User';

export type UserStatus = 'Active' | 'Suspended' | 'Pending';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  mobile?: string;
  language?: string;
  dob?: string;
  gender?: string;
  createdAt?: string;
  isSuperAdmin?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  status?: number;
  // Support both response formats
  data?: {
    user: User;
    token: string;
  };
  user?: User;
  token?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile?: string;
  language?: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
  pin: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    requiresVerification: boolean;
  };
  message: string;
  status: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  data: {
    user: User;
  };
  message: string;
  status: number;
}

export interface ResendOTPRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetTokenRequest {
  email: string;
  token: string;
}

export interface VerifyResetTokenResponse {
  success: boolean;
  data: {
    verified: boolean;
  };
  message: string;
  status: number;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  success: false;
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
