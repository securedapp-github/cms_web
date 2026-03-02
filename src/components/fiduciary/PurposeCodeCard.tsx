import { useState } from 'react';
import { Code2, Trash2, Copy, CheckCircle, Calendar } from 'lucide-react';
import { usePurposeCodes } from '../../hooks/queries/usePurposeCodes';
import toast from 'react-hot-toast';

interface PurposeCodeCardProps {
  purposeCode: {
    id: number | string;
    code: string;
    purpose: string;
    created_at: string;
  };
}

const PurposeCodeCard = ({ purposeCode }: PurposeCodeCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const { deleteCode, isDeleting } = usePurposeCodes();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Purpose code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy code');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCode(Number(purposeCode.id));
      toast.success('Purpose code deleted successfully');
      setShowDeleteConfirm(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete purpose code');
    }
  };

  const formattedDate = new Date(purposeCode.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Header Row */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center shrink-0">
                <Code2 className="w-7 h-7 text-green-600" />
              </div>

              {/* Code Info */}
              <div className="flex-1 min-w-0">
                <code className="text-lg font-bold font-mono text-gray-900 block mb-1">
                  {purposeCode.code}
                </code>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  Active
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => copyToClipboard(purposeCode.code)}
              className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
              title="Copy code"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {purposeCode.purpose}
            </p>
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              Created {formattedDate}
            </span>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-2.5 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
            {/* Header */}
            <div className="bg-linear-to-r from-red-600 to-rose-600 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Trash2 className="w-6 h-6" />
                Delete Purpose Code
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete the purpose code{' '}
                <code className="px-2 py-1 bg-gray-100 rounded font-mono text-sm font-bold text-gray-900">
                  {purposeCode.code}
                </code>
                ?
              </p>
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                ⚠️ This action cannot be undone. Any consents using this purpose code may be affected.
              </p>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-rose-600 text-white rounded-lg font-medium hover:from-red-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PurposeCodeCard;
