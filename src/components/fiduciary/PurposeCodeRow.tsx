import { useState } from 'react';
import { Code2, Trash2, Copy, CheckCircle, Calendar } from 'lucide-react';
import { usePurposeCodes } from '../../hooks/queries/usePurposeCodes';
import toast from 'react-hot-toast';

interface PurposeCodeRowProps {
  purposeCode: {
    id: number | string;
    code: string;
    purpose: string;
    created_at: string;
  };
  index: number;
}

const PurposeCodeRow = ({ purposeCode, index }: PurposeCodeRowProps) => {
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
      {/* Mobile Card View */}
      <tr className="md:hidden">
        <td colSpan={4} className="p-0">
          <div
            className="p-4 border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header with icon and code */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <code className="text-sm font-bold font-mono text-slate-900 block">
                  {purposeCode.code}
                </code>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                  Active
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-1">Purpose</p>
              <p className="text-sm text-slate-700">
                {purposeCode.purpose}
              </p>
            </div>

            {/* Created Date */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 p-2 bg-slate-50 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Created {formattedDate}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(purposeCode.code)}
                className="flex-1 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-300 flex items-center justify-center gap-2"
                title="Copy code"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">Copy</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors duration-300 flex items-center justify-center gap-2"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        </td>
      </tr>

      {/* Desktop Table Row */}
      <tr
        className="hidden md:table-row group border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Icon & Code */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <code className="text-sm font-bold font-mono text-slate-900 block">
                {purposeCode.code}
              </code>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>
          </div>
        </td>

        {/* Purpose Description */}
        <td className="px-6 py-4 max-w-md">
          <p className="text-sm text-slate-700 line-clamp-2">
            {purposeCode.purpose}
          </p>
        </td>

        {/* Created Date */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{formattedDate}</span>
          </div>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2 transition-opacity duration-300">
            <button
              onClick={() => copyToClipboard(purposeCode.code)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-300"
              title="Copy code"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors duration-300"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <tr>
          <td colSpan={4}>
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Delete Purpose Code</h3>
                    <p className="text-sm text-slate-600">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-2">
                  Are you sure you want to delete purpose code <code className="font-mono font-bold">{purposeCode.code}</code>?
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  This may affect existing consent requests using this purpose code.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-linear-to-r from-rose-600 to-pink-600 text-white font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default PurposeCodeRow;
