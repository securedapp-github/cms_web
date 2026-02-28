import { z } from 'zod';
import { VALIDATION_PATTERNS } from './constants';

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  mobile: z.string()
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .optional()
    .or(z.literal('')),
  language: z.string().optional(),
  role: z.enum(['User', 'Fiduciary', 'Admin'], {
    message: 'Please select a role',
  }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character (@$!%*?&#)'),
  confirmPassword: z.string(),
  pin: z.string()
    .regex(VALIDATION_PATTERNS.PIN, 'PIN must be exactly 4 digits'),
  termsAccepted: z.boolean()
    .refine(val => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required'),
  role: z.enum(['User', 'Fiduciary', 'Admin'], {
    message: 'Please select a role',
  }),
  rememberMe: z.boolean().optional(),
});

export const verifyEmailSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  otp: z.string()
    .regex(VALIDATION_PATTERNS.OTP, 'OTP must be exactly 4 digits'),
});

export const resendOTPSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
});

export const verifyResetTokenSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  token: z.string()
    .regex(VALIDATION_PATTERNS.RESET_TOKEN, 'Token must be exactly 6 digits'),
});

export const resetPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  token: z.string()
    .regex(VALIDATION_PATTERNS.RESET_TOKEN, 'Token must be exactly 6 digits'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character (@$!%*?&#)'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ResendOTPFormData = z.infer<typeof resendOTPSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetTokenFormData = z.infer<typeof verifyResetTokenSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Password strength checker
export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong', score: number } => {
  let score = 0;
  
  if (!password) return { strength: 'weak', score: 0 };
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&#]/.test(password)) score += 1;
  
  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
};
