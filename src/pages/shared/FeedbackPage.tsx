import { useState } from 'react';
import { MessageCircle, Bug, Sparkles, Send, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const FeedbackPage = () => {
  const [subject, setSubject] = useState('General Feedback');
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'bug' | 'feature'>('feedback');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.length < 10) {
      toast.error('Message must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Feedback submitted successfully!');
    setSubject('General Feedback');
    setFeedbackType('feedback');
    setMessage('');
    setIsSubmitting(false);
  };

  const feedbackTypes = [
    {
      id: 'feedback' as const,
      label: 'Feedback',
      shortLabel: 'Feedback',
      icon: MessageCircle,
      activeClass: 'bg-blue-600 text-white border-blue-600',
      inactiveClass: 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
    },
    {
      id: 'bug' as const,
      label: 'Bug Report',
      shortLabel: 'Bug',
      icon: Bug,
      activeClass: 'bg-orange-600 text-white border-orange-600',
      inactiveClass: 'bg-white text-gray-700 border-gray-300 hover:border-orange-400 hover:bg-orange-50'
    },
    {
      id: 'feature' as const,
      label: 'Feature Request',
      shortLabel: 'Feature',
      icon: Sparkles,
      activeClass: 'bg-purple-600 text-white border-purple-600',
      inactiveClass: 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-3 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Send Us Your Feedback
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              We'd love to hear from you! Share your feedback, report bugs, or request new features.
            </p>
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Subject */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="General Feedback"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
            />
          </div>

          {/* Type of Feedback */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Type of Feedback <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {feedbackTypes.map((type) => {
                const Icon = type.icon;
                const isActive = feedbackType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFeedbackType(type.id)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                      isActive ? type.activeClass : type.inactiveClass
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      <span className="sm:hidden">{type.shortLabel}</span>
                      <span className="hidden sm:inline">{type.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your feedback in detail..."
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-sm sm:text-base"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">Minimum 10 characters required</span>
              <span className="text-xs text-gray-500">{message.length}/1000</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || message.length < 10}
            className="w-full px-6 py-3.5 sm:py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
              Need immediate assistance?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href="mailto:support@cms.com"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                support@cms.com
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
