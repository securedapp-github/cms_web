import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { resetPasswordSchema } from '../utils/validation';
import type { ResetPasswordFormData } from '../utils/validation';
import authService from '../services/auth.service';
import { SUCCESS_MESSAGES } from '../utils/constants';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const token = location.state?.token;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!email || !token) {
      navigate('/forgot-password');
    } else {
      setValue('email', email);
      setValue('token', token);
    }
  }, [email, token, navigate, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      await authService.resetPassword(data);
      toast.success(SUCCESS_MESSAGES.PASSWORD_RESET);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) return null;

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          showPasswordToggle
          error={errors.newPassword?.message}
          {...register('newPassword')}
          required
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          showPasswordToggle
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          required
        />

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
