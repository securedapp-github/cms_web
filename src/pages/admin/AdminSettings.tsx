import { useState } from 'react';
import { useMockBackend } from '../../context/MockBackendContext';
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminSettings() {
    const { changePassword, logout } = useMockBackend();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Validation helpers
    const hasMinLength = newPassword.length >= 8;
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    const strengthScore = [hasMinLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    const isStrong = strengthScore === 4;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!isStrong) {
            setError("New password does not meet complexity requirements.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            setSuccess("Password changed successfully! Logging out...");

            // Wait a moment then logout
            setTimeout(() => {
                logout();
                navigate('/signin');
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to update password");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`w-full pl-3 pr-10 py-2 border ${error && !isStrong ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 mb-2">Password Requirements:</p>
                            <ul className="space-y-1 text-xs">
                                <li className={`flex items-center space-x-2 ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                                    {hasMinLength ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border rounded-full border-gray-300" />}
                                    <span>At least 8 characters</span>
                                </li>
                                <li className={`flex items-center space-x-2 ${hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                                    {hasUpper ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border rounded-full border-gray-300" />}
                                    <span>One uppercase letter</span>
                                </li>
                                <li className={`flex items-center space-x-2 ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                    {hasNumber ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border rounded-full border-gray-300" />}
                                    <span>One number</span>
                                </li>
                                <li className={`flex items-center space-x-2 ${hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                                    {hasSpecial ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border rounded-full border-gray-300" />}
                                    <span>One special character</span>
                                </li>
                            </ul>

                            {/* Strength Bar */}
                            <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${strengthScore <= 1 ? 'bg-red-500 w-1/4' :
                                        strengthScore === 2 ? 'bg-orange-500 w-2/4' :
                                            strengthScore === 3 ? 'bg-yellow-500 w-3/4' :
                                                'bg-green-500 w-full'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full pl-3 pr-10 py-2 border ${newPassword !== confirmPassword && confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {newPassword !== confirmPassword && confirmPassword && (
                            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                        )}
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-2 text-red-600 text-sm">
                            <XCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center space-x-2 text-green-600 text-sm">
                            <CheckCircle size={18} />
                            <span>{success}</span>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={!isStrong || newPassword !== confirmPassword || !!success}
                            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${!isStrong || newPassword !== confirmPassword || !!success
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                                }`}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
