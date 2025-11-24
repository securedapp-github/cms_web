import { MessageSquare, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import type { Feedback } from '../../types/admin.types';

interface FeedbackCardProps {
  feedback: Feedback;
  onRespond: (feedback: Feedback) => void;
}

const FeedbackCard = ({ feedback, onRespond }: FeedbackCardProps) => {
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

  const hasResponse = !!feedback.response;

  return (
    <div 
      onClick={() => onRespond(feedback)}
      className={`bg-white rounded-xl border-2 p-4 sm:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group ${
        hasResponse 
          ? 'border-slate-200 hover:border-emerald-300' 
          : 'border-amber-300 hover:border-amber-400 bg-amber-50/30'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 transition-all duration-200 ${
            hasResponse ? 'bg-linear-to-br from-emerald-500 to-teal-600' : 'bg-linear-to-br from-amber-500 to-orange-600'
          }`}>
            {hasResponse ? <CheckCircle2 className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{feedback.name}</h3>
              <span className={`px-2 py-0.5 rounded text-xs font-bold border-2 shrink-0 ${getCategoryColor(feedback.category)}`}>
                {feedback.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">ID: {feedback.id}</p>
          </div>
        </div>

        {/* Status Badge */}
        {hasResponse && (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border-2 border-emerald-200 shrink-0">
            Resolved
          </span>
        )}
      </div>

      {/* Contact Details */}
      <div className="space-y-1.5 mb-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Mail className="w-3 h-3 text-indigo-500 shrink-0" />
          <span className="truncate">{feedback.email}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Calendar className="w-3 h-3 text-indigo-500 shrink-0" />
          <span>{new Date(feedback.created_at).toLocaleString()}</span>
        </div>
      </div>

      {/* Message Preview */}
      <div className="mb-3">
        <p className="text-sm text-slate-700 font-medium line-clamp-2">{feedback.message}</p>
      </div>

      {/* Response Info */}
      {hasResponse && feedback.response_date && (
        <div className="pt-3 border-t-2 border-emerald-100">
          <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Responded on {new Date(feedback.response_date).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {/* Action Prompt */}
      {!hasResponse && (
        <div className="pt-3 border-t-2 border-amber-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600">Awaiting Response</span>
            <span className="text-xs text-amber-500 font-medium group-hover:text-amber-700">Click to respond →</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
