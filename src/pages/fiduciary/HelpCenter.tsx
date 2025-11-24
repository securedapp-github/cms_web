import { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { useFeedback } from '../../hooks/queries/useFeedback';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const HelpCenter = () => {
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'bug' | 'feature'>('feedback');
  const [message, setMessage] = useState('');
  const { submitFeedback, isSubmitting } = useFeedback();
  const { user } = useAuth();

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    if (message.trim().length < 10) {
      toast.error('Message must be at least 10 characters');
      return;
    }

    if (!user?.name || !user?.email) {
      toast.error('User information not found. Please log in again.');
      return;
    }

    const subject = feedbackType === 'feedback' 
      ? 'General Feedback' 
      : feedbackType === 'bug' 
      ? 'Bug Report' 
      : 'Feature Request';

    const priority = feedbackType === 'bug' ? 'high' : feedbackType === 'feature' ? 'medium' : 'low';

    try {
      await submitFeedback({
        name: user.name,
        email: user.email,
        subject,
        message: message.trim(),
        priority: priority as 'low' | 'medium' | 'high',
      });
      toast.success('Thank you for your feedback!');
      setMessage('');
      setFeedbackType('feedback');
    } catch {
      // Error already handled by hook
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 md:p-8">
          <div className="flex items-center gap-3 md:gap-4 mb-2">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Help Center
              </h1>
              <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1">
                Find answers, tutorials, and documentation to help you succeed
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and tutorials..."
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
            />
          </div>
        </div> */}

        {/* Categories */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-lg bg-${category.color}-50 flex items-center justify-center mb-4 transition-all duration-200`}>
                  <Icon className={`w-6 h-6 text-${category.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.articles} articles</p>
              </div>
            );
          })}
        </div> */}

        {/* Popular Articles */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Popular Articles</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-150">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{article.category}</p>
                  </div>
                  <span className="text-xs text-gray-500">{article.views.toLocaleString()} views</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Send Us Your Feedback
              </h3>
              <p className="text-slate-600 text-sm md:text-base">
                We'd love to hear from you! Share your feedback, report bugs, or request new features.
              </p>
            </div>

            <form onSubmit={handleSubmitFeedback} className="bg-linear-to-br from-slate-50/50 to-indigo-50/30 rounded-xl p-6 md:p-8 border-2 border-slate-200 space-y-6 shadow-sm">
              {/* Subject Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={feedbackType === 'feedback' ? 'General Feedback' : feedbackType === 'bug' ? 'Bug Report' : 'Feature Request'}
                  disabled
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl bg-white text-slate-700 font-semibold shadow-sm"
                />
              </div>

              {/* Feedback Type Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Type of Feedback <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('feedback')}
                    className={`px-4 py-3.5 rounded-xl font-bold transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
                      feedbackType === 'feedback'
                        ? 'bg-linear-to-br from-indigo-600 to-violet-600 text-white border-indigo-600 shadow-lg'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'
                    }`}
                  >
                    💬 Feedback
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('bug')}
                    className={`px-4 py-3.5 rounded-xl font-bold transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
                      feedbackType === 'bug'
                        ? 'bg-linear-to-br from-rose-600 to-pink-600 text-white border-rose-600 shadow-lg'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-rose-400'
                    }`}
                  >
                    🐛 Bug Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('feature')}
                    className={`px-4 py-3.5 rounded-xl font-bold transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
                      feedbackType === 'feature'
                        ? 'bg-linear-to-br from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-lg'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    ✨ Feature Request
                  </button>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your feedback in detail..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none bg-white shadow-sm"
                  disabled={isSubmitting}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-slate-500 font-medium">Minimum 10 characters required</p>
                  <span className={`text-xs font-semibold ${message.length > 900 ? 'text-rose-600' : 'text-slate-400'}`}>
                    {message.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || message.trim().length < 10}
                  className="w-full px-6 py-4 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Support Contact Info */}
            <div className="mt-8 text-center bg-linear-to-br from-indigo-50/50 to-violet-50/50 rounded-xl p-6 border-2 border-indigo-100">
              <p className="text-sm text-slate-600 font-semibold mb-3">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
                <a 
                  href="mailto:support@cms.com" 
                  className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2 transition-colors duration-200 hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  support@cms.com
                </a>
                <span className="hidden sm:inline text-slate-400">|</span>
                <span className="text-slate-700 font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
