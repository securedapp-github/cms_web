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
