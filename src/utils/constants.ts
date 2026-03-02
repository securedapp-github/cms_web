export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Consent Management System';
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'auth_token';
export const USER_KEY = 'auth_user';

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  INVALID_CREDENTIALS: 'Invalid email, password, or role',
  EMAIL_EXISTS: 'An account with this email already exists',
  INVALID_OTP: 'Invalid OTP. Please try again.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  VALIDATION_ERROR: 'Please check your input and try again',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in.',
  ACCOUNT_SUSPENDED: 'Your account has been suspended. Please contact support.',
  TOKEN_EXPIRED: 'Reset token has expired. Please request a new one.',
  INVALID_TOKEN: 'Invalid reset token. Please check and try again.',
} as const;

export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful! Please verify your email.',
  EMAIL_VERIFIED: 'Email verified successfully! You can now login.',
  LOGIN_SUCCESS: 'Welcome back!',
  OTP_SENT: 'OTP sent successfully to your email.',
  RESET_CODE_SENT: 'Password reset code sent to your email.',
  RESET_CODE_VERIFIED: 'Reset code verified successfully.',
  PASSWORD_RESET: 'Password reset successfully! Please login with your new password.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
} as const;

export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
  PIN: /^\d{4}$/,
  OTP: /^\d{4}$/,
  RESET_TOKEN: /^\d{6}$/,
  MOBILE: /^\+?[1-9]\d{1,14}$/,
} as const;

export const PASSWORD_REQUIREMENTS = [
  'At least 8 characters',
  'One uppercase letter',
  'One lowercase letter',
  'One number',
  'One special character (@$!%*?&#)',
] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_RESET_TOKEN: '/verify-reset-token',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
} as const;

export const ROLES = {
  FIDUCIARY: 'Fiduciary',
  ADMIN: 'Admin',
} as const;

export const OTP_LENGTH = 4;
export const RESET_TOKEN_LENGTH = 6;
export const RESEND_OTP_DELAY = 60; // seconds
export const TOKEN_EXPIRY_HOURS = 24;
