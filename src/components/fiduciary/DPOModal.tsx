import { X, User, Mail, Phone, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { DPO, AddDPORequest, UpdateDPORequest } from '../../types/fiduciary.types';

interface DPOModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddDPORequest | UpdateDPORequest) => Promise<void>;
  dpo?: DPO | null;
  isSubmitting: boolean;
}

export const DPOModal = ({ isOpen, onClose, onSubmit, dpo, isSubmitting }: DPOModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isPrimary: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Populate form when editing
  useEffect(() => {
    if (dpo) {
      setFormData({
        name: dpo.name || '',
        email: dpo.email || '',
        phone: dpo.phone || '',
        isPrimary: dpo.is_primary || false,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        isPrimary: false,
      });
    }
    setErrors({ name: '', email: '', phone: '' });
  }, [dpo, isOpen]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim().replace(/\s/g, ''),
        isPrimary: formData.isPrimary,
      });
      onClose();
    } catch (error) {
      // Error handling done in hook
    }
  };

  const handlePhoneChange = (value: string) => {
    // Only allow digits and limit to 10
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: cleaned });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6" />
            {dpo ? 'Edit DPO' : 'Add Data Protection Officer'}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter DPO name"
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="dpo@example.com"
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="9999999999"
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>}
            <p className="text-xs text-gray-500 mt-1.5">10-digit mobile number</p>
          </div>

          {/* Primary Contact Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className={`w-5 h-5 ${formData.isPrimary ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} />
              <div>
                <p className="text-sm font-semibold text-gray-800">Primary Contact</p>
                <p className="text-xs text-gray-600">Set as primary DPO</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : dpo ? 'Update DPO' : 'Add DPO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
