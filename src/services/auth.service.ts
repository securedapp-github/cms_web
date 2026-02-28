import api from './api';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  AuthResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendOTPRequest,
  ForgotPasswordRequest,
  VerifyResetTokenRequest,
  VerifyResetTokenResponse,
  ResetPasswordRequest,
  ApiResponse,
} from '../types/auth.types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/register', data);
    return response.data;
  },

  /**
   * Verify email with OTP
   */
  verifyEmail: async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    const response = await api.post<VerifyEmailResponse>('/verify-email', data);
    return response.data;
  },

  /**
   * Resend OTP for email verification
   */
  resendOTP: async (data: ResendOTPRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/resend-otp', data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', data);
    return response.data;
  },

  /**
   * Send password reset code
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/forgot-password', data);
    return response.data;
  },

  /**
   * Verify password reset token
   */
  verifyResetToken: async (data: VerifyResetTokenRequest): Promise<VerifyResetTokenResponse> => {
    const response = await api.post<VerifyResetTokenResponse>('/verify-reset-token', data);
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/reset-password', data);
    return response.data;
  },
};

export default authService;
