import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, Users } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { loginSchema } from '../utils/validation';
import type { LoginFormData } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const user = await login(data, data.rememberMe);
      
      // Redirect based on role
      if (user?.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user?.role === 'Fiduciary') {
        navigate('/fiduciary/dashboard');
      } else if (user?.role === 'User') {
        navigate('/user/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch {
      // Error already handled by auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
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

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          showPasswordToggle
          error={errors.password?.message}
          {...register('password')}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <label className="relative flex items-center justify-center cursor-pointer">
              <input
                type="radio"
                value="User"
                className="absolute opacity-0 peer"
                {...register('role')}
              />
              <div className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:shadow-md transition-all hover:border-indigo-400">
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600 peer-checked:text-indigo-700" />
                  <span className="font-medium text-sm text-gray-700 peer-checked:text-indigo-900">User</span>
                </div>
              </div>
            </label>
            <label className="relative flex items-center justify-center cursor-pointer">
              <input
                type="radio"
                value="Fiduciary"
                className="absolute opacity-0 peer"
                {...register('role')}
              />
              <div className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md transition-all hover:border-blue-400">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-600 peer-checked:text-blue-700" />
                  <span className="font-medium text-sm text-gray-700 peer-checked:text-blue-900">Fiduciary</span>
                </div>
              </div>
            </label>
            <label className="relative flex items-center justify-center cursor-pointer">
              <input
                type="radio"
                value="Admin"
                className="absolute opacity-0 peer"
                {...register('role')}
              />
              <div className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg peer-checked:border-purple-600 peer-checked:bg-purple-50 peer-checked:shadow-md transition-all hover:border-purple-400">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-600 peer-checked:text-purple-700" />
                  <span className="font-medium text-sm text-gray-700 peer-checked:text-purple-900">Admin</span>
                </div>
              </div>
            </label>
          </div>
          {errors.role && errors.role.message && <ErrorMessage message={errors.role.message} className="mt-2" />}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
              {...register('rememberMe')}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-primary-900 hover:underline font-medium">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-900 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
