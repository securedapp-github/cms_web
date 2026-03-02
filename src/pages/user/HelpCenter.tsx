import { HelpCircle, Mail, User, MessageSquare, Send, ExternalLink, FileText, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { submitFeedback } from '../../services/fiduciary.service';
import toast from 'react-hot-toast';

interface FeedbackForm {
  name: string;
  email: string;
  message: string;
  category: string;
}

const HelpCenter = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FeedbackForm>({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
    category: 'General',
  });

  const [errors, setErrors] = useState<Partial<FeedbackForm>>({});

  const validateForm = () => {
    const newErrors: Partial<FeedbackForm> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitFeedback({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        subject: formData.category,
        priority: 'medium',
      });

      if (response.success) {
        toast.success('Feedback submitted successfully! We\'ll get back to you soon.');
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          message: '',
          category: 'General',
        });
        setErrors({});
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Help Center
          </h1>
          <p className="text-gray-600 text-lg">
            Have a question or need assistance? We're here to help!
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Send Us a Message</h2>
            <p className="text-indigo-100 text-sm mt-1">
              Fill out the form below and we'll respond as soon as possible
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
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
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
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
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                disabled={isSubmitting}
              >
                <option value="General">General Inquiry</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Account">Account Related</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all resize-none ${
                    errors.message
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  placeholder="Describe your issue or question in detail..."
                  disabled={isSubmitting}
                />
              </div>
              {errors.message && <p className="text-xs text-red-600 mt-1.5">{errors.message}</p>}
              <p className="text-xs text-gray-500 mt-1.5">
                Minimum 10 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Legal Documents */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://docs.google.com/document/d/1nbUfuasIK6ADGWet3C-RR7IxAFrkUWLAPsGCZDvn86Q/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border-2 border-indigo-200 hover:border-indigo-400 rounded-xl p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <ExternalLink className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              Terms of Service
            </h3>
            <p className="text-sm text-gray-600">
              Read our terms and conditions for using Secure CMS
            </p>
          </a>

          <a
            href="https://docs.google.com/document/d/1aDsmIuq8nM_0abq6xvcPenXXqGKN6ac59_QbOKRDbQQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border-2 border-purple-200 hover:border-purple-400 rounded-xl p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              Privacy Policy
            </h3>
            <p className="text-sm text-gray-600">
              Learn how we protect and handle your data
            </p>
          </a>
        </div>

        {/* Support Info */}
        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
          <p className="text-sm text-indigo-900">
            <strong>Need immediate assistance?</strong> Our support team typically responds within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
