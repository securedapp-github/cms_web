import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Globe, Shield, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { registerSchema, getPasswordStrength } from '../utils/validation';
import type { RegisterFormData } from '../utils/validation';
import authService from '../services/auth.service';
import { PASSWORD_REQUIREMENTS, SUCCESS_MESSAGES } from '../utils/constants';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const watchedPassword = watch('password', '');
  const passwordStrength = getPasswordStrength(watchedPassword);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await authService.register(data);
      toast.success(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);
      navigate('/verify-email', { state: { email: data.email } });
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
    //   subtitle="Join the elite 0.001% of users"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={<User className="h-5 w-5" />}
          error={errors.name?.message}
          {...register('name')}
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="you@company.com"
          icon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
          required
        />

        {/* Mobile (Optional) */}
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="1234567890"
          icon={<Phone className="h-5 w-5" />}
          error={errors.mobile?.message}
          {...register('mobile')}
          maxLength={10}
        />

        {/* Language (Optional) */}
        <Input
          label="Preferred Language"
          type="text"
          placeholder="English"
          icon={<Globe className="h-5 w-5" />}
          error={errors.language?.message}
          {...register('language')}
        />

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative flex items-center justify-center cursor-pointer">
              <input
                type="radio"
                value="Fiduciary"
                className="absolute opacity-0 peer"
                {...register('role')}
              />
              <div className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md transition-all hover:border-blue-400">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-900 peer-checked:text-blue-700" />
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
              <div className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md transition-all hover:border-blue-400">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-900 peer-checked:text-blue-700" />
                  <span className="font-medium text-sm text-gray-700 peer-checked:text-blue-900">Admin</span>
                </div>
              </div>
            </label>
          </div>
          {errors.role && errors.role.message && <ErrorMessage message={errors.role.message} className="mt-2" />}
        </div>

        {/* Password */}
        <div>
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
          {/* Password Strength Indicator */}
          {watchedPassword && (
            <div className="mt-2">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      level <= passwordStrength.score
                        ? passwordStrength.strength === 'weak'
                          ? 'bg-rose-500'
                          : passwordStrength.strength === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Strength:{' '}
                <span
                  className={`font-medium ${
                    passwordStrength.strength === 'weak'
                      ? 'text-rose-500'
                      : passwordStrength.strength === 'medium'
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                  }`}
                >
                  {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          showPasswordToggle
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          required
        />

        {/* PIN */}
        <Input
          label="4-Digit PIN"
          type="password"
          placeholder="••••"
          maxLength={4}
          error={errors.pin?.message}
          {...register('pin')}
          required
        />

        {/* Password Requirements */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
          <ul className="space-y-1">
            {PASSWORD_REQUIREMENTS.map((req, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="h-3 w-3 text-emerald-500" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
            {...register('termsAccepted')}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-primary-900 hover:underline font-medium">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-900 hover:underline font-medium">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.termsAccepted && errors.termsAccepted.message && <ErrorMessage message={errors.termsAccepted.message} />}

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          Create Account
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-900 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
