import { X, MessageSquare, Send, User, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import type { Feedback } from '../../types/admin.types';
import { useState } from 'react';

interface FeedbackResponseModalProps {
  feedback: Feedback | null;
  isOpen: boolean;
  onClose: () => void;
  onSendResponse: (feedbackId: number, response: string) => Promise<boolean>;
}

const FeedbackResponseModal = ({ feedback, isOpen, onClose, onSendResponse }: FeedbackResponseModalProps) => {
  const [response, setResponse] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !feedback) return null;

  const hasResponse = !!feedback.response;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'General':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Complaint':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Suggestion':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const category = feedback.category || 'General';

  const handleSend = async () => {
    if (!response.trim() || hasResponse) return;

    setIsSending(true);
    const success = await onSendResponse(feedback.id, response.trim());
    setIsSending(false);

    if (success) {
      setResponse('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className={`px-6 py-5 flex items-center justify-between rounded-t-2xl ${
          hasResponse ? 'bg-linear-to-r from-slate-700 to-slate-600' : 'bg-linear-to-r from-slate-700 to-slate-600'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Feedback Details</h2>
              <p className="text-xs text-white/80">ID: {feedback.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 ${getCategoryColor(category)}`}>
              {category}
            </span>
            {hasResponse && (
              <span className="px-3 py-1.5 rounded-lg text-sm font-bold bg-emerald-50 text-emerald-700 border-2 border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Resolved
              </span>
            )}
          </div>

          {/* User Information */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              User Details
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-2 border-2 border-slate-200">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">Name:</span>
                <span className="text-slate-900 font-bold">{feedback.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">Email:</span>
                <span className="text-slate-900 font-bold break-all">{feedback.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium">Submitted:</span>
                <span className="text-slate-900 font-bold">{new Date(feedback.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Feedback Message */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-violet-600" />
              Feedback Message
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
              <p className="text-sm text-slate-900 font-medium whitespace-pre-wrap">{feedback.message}</p>
            </div>
          </div>

          {/* Response Section */}
          {hasResponse ? (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Admin Response
              </h3>
              <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
                <p className="text-sm text-slate-900 font-medium whitespace-pre-wrap mb-3">{feedback.response}</p>
                {feedback.response_date && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                    <Calendar className="w-3 h-3" />
                    <span>Responded on {new Date(feedback.response_date).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-600" />
                Send Response
              </h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-sm font-medium"
                disabled={isSending}
              />
              <p className="text-xs text-slate-500 font-medium mt-2">
                Provide a helpful and professional response to address the user's feedback.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t-2 border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3">
              {!hasResponse && (
                <button
                  onClick={handleSend}
                  disabled={isSending || !response.trim()}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-violet-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Response</span>
                    </>
                  )}
                </button>
              )}
              
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors border-2 border-slate-200"
              >
                {hasResponse ? 'Close' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackResponseModal;
