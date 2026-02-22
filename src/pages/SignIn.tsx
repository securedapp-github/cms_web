import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, Users, UserCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMockBackend } from '../context/MockBackendContext';
import PhoneVerification from '../components/PhoneVerification';

type Role = 'user' | 'fiduciary' | 'admin' | null;

export default function SignIn() {
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile' | 'wallet'>('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [walletAddr, setWalletAddr] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [useEmailOtp, setUseEmailOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'user' as Role, label: 'User', icon: Users },
    { id: 'fiduciary' as Role, label: 'Fiduciary', icon: Shield },
    { id: 'admin' as Role, label: 'Admin', icon: UserCheck }
  ];

  const { loginWithCredentials, loginWithOtp, loginWithOAuth, loginWithWallet } = useMockBackend();
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider: string) => {
    alert(`Redirecting to ${provider}...`);
    const success = await loginWithOAuth(provider);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleWalletLogin = async () => {
    // Mock wallet connection
    const mockAddress = '0x123...abc';
    setWalletAddr(mockAddress);
    const success = await loginWithWallet(mockAddress);
    if (success) {
      alert('Wallet Connected & Logged In');
      navigate('/dashboard');
    }
  };

  const handlePhoneVerified = (phoneNum: string, isVerified: boolean) => {
    setMobile(phoneNum);
    setIsPhoneVerified(isVerified);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // OTP Sending Logic for Email Only now (Mobile handled by component)
    if (authMethod === 'email' && useEmailOtp && !isOtpSent) {
      setIsOtpSent(true);
      alert(`OTP sent to ${email}`);
      return;
    }

    let success = false;

    // Login Logic
    if (authMethod === 'mobile') {
      if (!isPhoneVerified) {
        alert('Please verify your mobile number first.');
        return;
      }
      // Since frontend verified it, we mock the backend call with the magic OTP
      success = await loginWithOtp(mobile, '123456');
    } else if (authMethod === 'email' && useEmailOtp) {
      success = await loginWithOtp(email, otp);
      if (!success) {
        alert('Invalid OTP. Please try again.');
        return;
      }
    } else {
      // Password Login
      success = await loginWithCredentials(email, password, selectedRole || 'user');
    }

    if (!success) {
      alert('Login failed: Invalid credentials, or role mismatch. Please verify your details.');
      return;
    }

    // For demo purposes, we redirect based on role selection or default to dashboard
    if (selectedRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">
            Secure <span className="text-orange-500">CMS</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="flex justify-center mb-6 border-b border-gray-200 gap-4">
            <button
              className={`pb-2 px-2 text-sm font-medium ${authMethod === 'email' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMethod('email'); setIsOtpSent(false); setOtp(''); }}
            >
              Email
            </button>
            <button
              className={`pb-2 px-2 text-sm font-medium ${authMethod === 'mobile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMethod('mobile'); setIsOtpSent(false); setOtp(''); }}
            >
              Mobile
            </button>
            <button
              className={`pb-2 px-2 text-sm font-medium ${authMethod === 'wallet' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMethod('wallet'); setIsOtpSent(false); }}
            >
              Wallet
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {authMethod === 'email' && (
              <>
                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        className="text-blue-600"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        className="text-green-600"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                        className="text-yellow-600"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        className="text-red-600"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('microsoft')}
                    className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5 mr-2" />
                    Microsoft
                  </button>
                </div>
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {!isOtpSent ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          required={authMethod === 'email'}
                        />
                      </div>
                    </div>

                    {!useEmailOtp ? (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required={authMethod === 'email' && !useEmailOtp}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setUseEmailOtp(!useEmailOtp)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {useEmailOtp ? 'Login with Password' : 'Login via OTP'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter OTP sent to {email}
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsOtpSent(false)}
                      className="text-sm text-blue-600 hover:underline mt-2"
                    >
                      Change Email
                    </button>
                  </div>
                )}
              </>
            )}

            {authMethod === 'mobile' && (
              <PhoneVerification onVerified={handlePhoneVerified} />
            )}

            {authMethod === 'wallet' && (
              <div className="text-center py-4 space-y-4">
                <button
                  type="button"
                  onClick={handleWalletLogin}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 w-full"
                >
                  {walletAddr ? 'Wallet Connected: ' + walletAddr : 'Connect Wallet'}
                </button>
                <p className="text-sm text-gray-500">Connect using MetaMask or WalletConnect</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center space-y-2 ${selectedRole === role.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <role.icon className={`w-6 h-6 ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-700'}`}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {authMethod !== 'wallet' && (
              <button
                type="submit"
                disabled={authMethod === 'mobile' && !isPhoneVerified}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${authMethod === 'mobile' && !isPhoneVerified
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {authMethod === 'email' && useEmailOtp && !isOtpSent ? 'Send OTP' : 'Sign In'}
              </button>
            )}


            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
