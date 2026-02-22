import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, Users, UserCheck, User, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMockBackend } from '../context/MockBackendContext';
import PhoneVerification from '../components/PhoneVerification';
import { isValidEmail } from '../utils/validation';

type Role = 'user' | 'fiduciary' | 'admin' | null;

export default function SignUp() {
  const [regMethod, setRegMethod] = useState<'email' | 'mobile'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [mobile, setMobile] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const roles = [
    { id: 'user' as Role, label: 'User', icon: Users },
    { id: 'fiduciary' as Role, label: 'Fiduciary', icon: Shield },
    { id: 'admin' as Role, label: 'Admin', icon: UserCheck }
  ];

  const { register } = useMockBackend();
  const navigate = useNavigate();

  const handlePhoneVerified = (phoneNum: string, isVerified: boolean) => {
    setMobile(phoneNum);
    setIsPhoneVerified(isVerified);
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError(null);
      return;
    }
    const { isValid, error } = isValidEmail(email);
    if (!isValid && error) {
      setEmailError(error);
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Strict Password Validation
    const isPasswordValid = passwordRequirements.every(req => req.valid);
    if (!isPasswordValid) {
      alert("Please meet all password requirements.");
      return;
    }

    if (regMethod === 'mobile') {
      if (!isPhoneVerified) {
        alert('Please verify your phone number before proceeding.');
        return;
      }
    } else {
      // Checking email validation again on submit
      const { isValid, error } = isValidEmail(email);
      if (!isValid) {
        setEmailError(error || "Invalid email");
        alert("Please provide a valid email address.");
        return;
      }
    }

    try {
      const success = await register({
        name,
        email: regMethod === 'email' ? email : undefined,
        mobile: regMethod === 'mobile' ? mobile : undefined,
        role: selectedRole || 'user'
      }, password);

      if (success) {
        alert('Registration Successful! Redirecting...');
        navigate('/dashboard');
      } else {
        alert('Registration Failed: User with this email/mobile already exists.');
      }
    } catch (error) {
      console.error("Registration error", error);
      alert("An unexpected error occurred.");
    }
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /[0-9]/.test(password) },
    { label: 'One special character (@$!%*?&#)', valid: /[@$!%*?&#]/.test(password) },
  ];

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
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          </div>


          <div className="flex justify-center mb-6 border-b border-gray-200">
            <button
              className={`pb-2 px-4 text-sm font-medium ${regMethod === 'email' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setRegMethod('email')}
            >
              Email
            </button>
            <button
              className={`pb-2 px-4 text-sm font-medium ${regMethod === 'mobile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setRegMethod('mobile')}
            >
              Mobile Number
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>


            {regMethod === 'email' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null); // Clear error on edit
                    }}
                    onBlur={handleEmailBlur}
                    placeholder="you@company.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${emailError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-transparent focus:ring-blue-500'
                      }`}
                    required={regMethod === 'email'}
                  />
                </div>
                {emailError && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {emailError}
                  </p>
                )}
              </div>
            )}


            {regMethod === 'mobile' && (
              <PhoneVerification onVerified={handlePhoneVerified} />
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
                  required
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                4-Digit PIN <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all tracking-widest text-center text-lg"
                  required
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Password must contain:</p>
              <ul className="space-y-1 text-xs text-gray-600">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className={`flex items-center space-x-2 ${req.valid ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check className={`w-3 h-3 ${req.valid ? 'opacity-100' : 'opacity-0'}`} />
                    <span>{req.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  required
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={regMethod === 'email' && !!emailError}
              className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${regMethod === 'email' && !!emailError
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
