import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, Lock, Camera, Globe, Users2, LogOut, Plus, UserCog, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProfile } from '../../hooks/queries/useProfile';
import { useDPO } from '../../hooks/queries/useDPO';
import { DPOCard } from '../../components/fiduciary/DPOCard';
import { DPOModal } from '../../components/fiduciary/DPOModal';
import type { DPO } from '../../types/fiduciary.types';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // DPO Management (only for fiduciaries)
  const isFiduciary = user?.role?.toLowerCase() === 'fiduciary';
  const { dpos, isLoading: isDPOLoading, isSubmitting: isDPOSubmitting, addDPO, updateDPO: updateDPOFunc, deleteDPO } = useDPO(isFiduciary);
  const [showDPOModal, setShowDPOModal] = useState(false);
  const [selectedDPO, setSelectedDPO] = useState<DPO | null>(null);
  const [dpoToDelete, setDPOToDelete] = useState<DPO | null>(null);
  const [showDeleteDPOConfirm, setShowDeleteDPOConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    language: user?.language || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
  });

  // Store original data to restore on cancel
  const [originalData, setOriginalData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    language: user?.language || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      // Format date from ISO to YYYY-MM-DD
      const formattedDob = profile.dob ? profile.dob.split('T')[0] : '';
      
      const profileData = {
        name: profile.name || '',
        email: profile.email || '',
        mobile: profile.mobile || '',
        language: profile.language || '',
        dob: formattedDob,
        gender: profile.gender || '',
      };
      
      setFormData(profileData);
      setOriginalData(profileData); // Store original data for cancel
    }
  }, [profile]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!formData.mobile.trim()) {
      toast.error('Mobile number is required');
      return;
    }

    if (!formData.language.trim()) {
      toast.error('Language is required');
      return;
    }

    if (!formData.dob.trim()) {
      toast.error('Date of birth is required');
      return;
    }

    if (!formData.gender) {
      toast.error('Gender is required');
      return;
    }

    try {
      await updateProfile({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        language: formData.language.trim(),
        dob: formData.dob,
        gender: formData.gender,
      });
      setOriginalData({ ...formData }); // Update original data after successful save
      setIsEditing(false);
    } catch (error: any) {
      // Error already handled by the hook
    }
  };

  const handleCancel = () => {
    setFormData({ ...originalData }); // Restore original data from API
    setAvatarPreview(null);
    setIsEditing(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordData.currentPassword) {
      toast.error('Current password is required');
      return;
    }

    if (!passwordData.newPassword) {
      toast.error('New password is required');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // TODO: Implement password change API call
    try {
      // await changePassword(passwordData);
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordModal(false);
    } catch {
      toast.error('Failed to change password');
    }
  };

  const handleLogout = () => {
    try {
      // Call logout from AuthContext (it clears storage and shows success toast)
      logout();
      
      // Close confirmation modal
      setShowLogoutConfirm(false);
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // DPO Handlers
  const handleAddDPO = () => {
    setSelectedDPO(null);
    setShowDPOModal(true);
  };

  const handleEditDPO = (dpo: DPO) => {
    setSelectedDPO(dpo);
    setShowDPOModal(true);
  };

  const handleDeleteDPO = (dpo: DPO) => {
    setDPOToDelete(dpo);
    setShowDeleteDPOConfirm(true);
  };

  const confirmDeleteDPO = async () => {
    if (!dpoToDelete) return;
    try {
      await deleteDPO(dpoToDelete.id);
      setShowDeleteDPOConfirm(false);
      setDPOToDelete(null);
    } catch (error) {
      // Error already handled by hook
    }
  };

  const handleDPOSubmit = async (data: any) => {
    if (selectedDPO) {
      await updateDPOFunc({ id: selectedDPO.id, data });
    } else {
      await addDPO(data);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'fiduciary' 
      ? 'bg-blue-100 text-blue-700 border-blue-300'
      : 'bg-purple-100 text-purple-700 border-purple-300';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 py-4 sm:py-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Manage your account information, security settings, and preferences.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Cover Image */}
              <div className={`h-24 sm:h-32 ${user?.role === 'Fiduciary' ? 'bg-linear-to-r from-blue-600 to-indigo-600' : 'bg-linear-to-r from-purple-600 to-pink-600'}`} />

              {/* Profile Content */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-12 sm:-mt-16 mb-4 sm:mb-6 gap-3">
                  <div className="flex items-end gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-700">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          getInitials(formData.name || user?.name || 'User')
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                          <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div className="mb-1 sm:mb-2 flex-1 min-w-0">
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{user?.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm text-sm shrink-0"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit Profile</span>
                      <span className="sm:hidden">Edit</span>
                    </button>
                  ) : (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleCancel}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm text-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Information */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Full Name
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 text-sm sm:text-base">{formData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">{formData.email}</p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Mobile Number
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Enter your mobile number"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">{formData.mobile || 'Not provided'}</p>
                    )}
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Language
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="e.g., English, Hindi, Spanish"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">{formData.language || 'Not provided'}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date of Birth
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">{formData.dob || 'Not provided'}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Users2 className="w-4 h-4" />
                        Gender
                      </div>
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 capitalize">{formData.gender || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Account Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Role</p>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 capitalize ${getRoleBadgeColor(user?.role || '')}`}>
                    {user?.role}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">User ID</p>
                  <p className="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user?.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Member Since</p>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Security
              </h3>
              <div className="space-y-3">
                {/* <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-2 border border-blue-200"
                >
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Change Password</span>
                  <span className="sm:hidden">Password</span>
                </button> */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2 border border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection Officers Section - Only for Fiduciaries */}
        {isFiduciary && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserCog className="w-6 h-6" />
                    Data Protection Officers
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Manage your DPO contacts
                  </p>
                </div>
                <button
                  onClick={handleAddDPO}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 font-medium shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add DPO
                </button>
              </div>

              {/* DPO List */}
              <div className="p-6">
                {isDPOLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : dpos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCog className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No DPO Added Yet</h3>
                    <p className="text-gray-600 mb-4">
                      Add a Data Protection Officer to get started
                    </p>
                    <button
                      onClick={handleAddDPO}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First DPO
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dpos.filter(dpo => dpo && dpo.id).map((dpo) => (
                      <DPOCard
                        key={dpo.id}
                        dpo={dpo}
                        onEdit={handleEditDPO}
                        onDelete={handleDeleteDPO}
                        showActions={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
            {/* Header */}
            <div className="bg-linear-to-r from-red-600 to-rose-600 px-6 py-5 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Change Password</h2>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="Enter new password (min. 8 characters)"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Minimum 8 characters with letters and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="Re-enter new password"
                />
              </div>

              {/* Security Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-yellow-800">
                  ⚠️ After changing your password, you'll be logged out and need to sign in again with your new password.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-rose-600 text-white rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] rounded-3xl max-w-md w-full border border-gray-700 shadow-2xl">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                  <LogOut className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-white text-center mb-3">Confirm Logout</h2>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DPO Management Modal */}
      {isFiduciary && (
        <DPOModal
          isOpen={showDPOModal}
          onClose={() => {
            setShowDPOModal(false);
            setSelectedDPO(null);
          }}
          onSubmit={handleDPOSubmit}
          dpo={selectedDPO}
          isSubmitting={isDPOSubmitting}
        />
      )}

      {/* Delete DPO Confirmation Modal */}
      {isFiduciary && showDeleteDPOConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <UserCog className="w-8 h-8 text-red-600" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 text-center mb-3">Delete DPO</h2>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">{dpoToDelete?.name}</span>? This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteDPOConfirm(false);
                    setDPOToDelete(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteDPO}
                  disabled={isDPOSubmitting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDPOSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Profile;
