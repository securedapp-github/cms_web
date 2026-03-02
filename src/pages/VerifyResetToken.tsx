import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../components/layout/AuthLayout';
import authService from '../services/auth.service';
import { SUCCESS_MESSAGES } from '../utils/constants';

const VerifyResetToken: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [token, setToken] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  
  // Create refs properly at component level
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) navigate('/forgot-password');
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newToken = [...token];
    newToken[index] = value.slice(-1);
    setToken(newToken);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newToken.every(digit => digit !== '')) {
      handleVerify(newToken.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !token[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (tokenValue: string) => {
    setLoading(true);
    try {
      await authService.verifyResetToken({ email, token: tokenValue });
      toast.success(SUCCESS_MESSAGES.RESET_CODE_VERIFIED);
      navigate('/reset-password', { state: { email, token: tokenValue } });
    } catch (error: any) {
      toast.error(error.message || 'Invalid reset code');
      setToken(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <AuthLayout title="Verify Reset Code" subtitle={`Enter the code sent to ${email}`}>
      <div className="space-y-6">
        <div className="flex gap-2 justify-center">
          {token.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 focus:outline-none transition-all"
              disabled={loading}
            />
          ))}
        </div>

        <div className="pt-4 border-t">
          <Link to="/forgot-password" className="block text-center text-sm text-gray-600 hover:text-primary-900">
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyResetToken;
