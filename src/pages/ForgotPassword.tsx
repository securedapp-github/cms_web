<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMockBackend } from '../context/MockBackendContext';
import { Shield, Mail, Key, Lock, ArrowRight, Smartphone } from 'lucide-react';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { resetPassword } = useMockBackend();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [contactType, setContactType] = useState<'email' | 'mobile'>('email');
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Validation
    const isPasswordValid = newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[0-9]/.test(newPassword) &&
        /[!@#$%^&*]/.test(newPassword);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (!contact) {
                setError("Please enter your email or mobile number");
                return;
            }
            // In a real app we might check if user exists here or just send blindly
            setStep(2);
        }, 1000);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (otp !== '123456') {
            setError("Invalid OTP. Please try again.");
            return;
        }

        setError(null);
        setStep(3);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (!isPasswordValid) {
            setError("Password does not meet complexity requirements");
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(contact, otp, newPassword);
            setSuccess("Password reset successfully! Redirecting...");
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Key className="w-6 h-6 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="text-gray-500 mt-2">
                        {step === 1 && "No worries, we'll send you reset instructions."}
                        {step === 2 && `Enter the code sent to ${contact}`}
                        {step === 3 && "Create your new password"}
                    </p>
                </div>

                {/* Steps */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="flex justify-center space-x-4 mb-6">
                            <button
                                type="button"
                                className={`pb-2 px-4 text-sm font-medium transition-colors ${contactType === 'email' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => { setContactType('email'); setContact(''); setError(null); }}
                            >
                                Email
                            </button>
                            <button
                                type="button"
                                className={`pb-2 px-4 text-sm font-medium transition-colors ${contactType === 'mobile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => { setContactType('mobile'); setContact(''); setError(null); }}
                            >
                                Mobile
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {contactType === 'email' ? 'Email Address' : 'Mobile Number'}
                            </label>
                            <div className="relative">
                                {contactType === 'email' ? (
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                ) : (
                                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                )}
                                <input
                                    type={contactType === 'email' ? 'email' : 'tel'}
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder={contactType === 'email' ? "Enter your email" : "Enter your mobile number"}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                            {isLoading ? 'Sending...' : 'Send Security Code'}
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Security Code
                            </label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Use <span className="font-mono font-bold">123456</span> for demo</p>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium"
                        >
                            Change {contactType}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <ul className="mt-2 text-xs text-gray-500 space-y-1">
                                <li className={newPassword.length >= 8 ? 'text-green-600' : ''}>• Min 8 characters</li>
                                <li className={/[A-Z]/.test(newPassword) ? 'text-green-600' : ''}>• One uppercase</li>
                                <li className={/[0-9]/.test(newPassword) ? 'text-green-600' : ''}>• One number</li>
                                <li className={/[!@#$%^&*]/.test(newPassword) ? 'text-green-600' : ''}>• One special char</li>
                            </ul>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

                        <button
                            type="submit"
                            disabled={isLoading || !!success}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <Link to="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-2">
                        <span>Back to Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
=======
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { forgotPasswordSchema } from '../utils/validation';
import type { ForgotPasswordFormData } from '../utils/validation';
import authService from '../services/auth.service';
import { SUCCESS_MESSAGES } from '../utils/constants';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      await authService.forgotPassword(data);
      toast.success(SUCCESS_MESSAGES.RESET_CODE_SENT);
      navigate('/verify-reset-token', { state: { email: data.email } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset code">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@company.com"
          icon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
          required
        />

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          Send Reset Code
        </Button>

        <div className="text-center space-y-2">
          <Link to="/login" className="block text-sm text-primary-900 hover:underline font-medium">
            ← Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
>>>>>>> bf94a3986d9147857f84bc14b7c3f64dbc5a48fa
