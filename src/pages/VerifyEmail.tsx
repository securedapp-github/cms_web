import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/layout/AuthLayout';
import { InlineLoader } from '../components/common/Loader';
import authService from '../services/auth.service';
import { SUCCESS_MESSAGES, RESEND_OTP_DELAY } from '../utils/constants';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpValue: string) => {
    setLoading(true);
    try {
      await authService.verifyEmail({ email, otp: otpValue });
      toast.success(SUCCESS_MESSAGES.EMAIL_VERIFIED);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.resendOTP({ email });
      toast.success(SUCCESS_MESSAGES.OTP_SENT);
      setCountdown(RESEND_OTP_DELAY);
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <AuthLayout title="Verify Your Email" subtitle={`We sent a code to ${email}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{email}</span>
        </div>

        <div className="flex gap-3 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={loading}
              autoComplete="off"
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center">
            <InlineLoader />
          </div>
        )}

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-gray-600">
              Resend code in <span className="font-medium">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-sm text-primary-900 hover:underline font-medium disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>

        <div className="pt-4 border-t">
          <Link to="/signup" className="block text-center text-sm text-gray-600 hover:text-primary-900">
            ← Back to Sign Up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
