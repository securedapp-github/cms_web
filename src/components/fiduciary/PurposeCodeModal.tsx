import { useState } from 'react';
import { X, Code2, Plus } from 'lucide-react';
import { usePurposeCodes } from '../../hooks/queries/usePurposeCodes';
import toast from 'react-hot-toast';

interface PurposeCodeModalProps {
  onClose: () => void;
}

const PurposeCodeModal = ({ onClose }: PurposeCodeModalProps) => {
  const [code, setCode] = useState('');
  const [purpose, setPurpose] = useState('');
  const { addCode, isAdding } = usePurposeCodes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!code.trim()) {
      toast.error('Code is required');
      return;
    }

    // Validate that code is a number
    const codeNumber = parseInt(code.trim(), 10);
    if (isNaN(codeNumber)) {
      toast.error('Code must be a valid number');
      return;
    }

    if (!purpose.trim()) {
      toast.error('Purpose is required');
      return;
    }

    try {
      await addCode({
        code: codeNumber,
        purpose: purpose.trim(),
      });
      toast.success('Purpose code added successfully');
      onClose();
    } catch {
      // Error already handled by the hook
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-linear-to-r from-green-600 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Add Purpose Code</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Code Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  // Prevent e, E, +, -, . from being entered
                  if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                placeholder="e.g., 1001, 2002, 3003"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all font-mono text-sm"
                disabled={isAdding}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Enter a numeric code
            </p>
          </div>

          {/* Purpose Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Purpose <span className="text-red-500">*</span>
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe the purpose..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none text-sm"
              disabled={isAdding}
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Describe what this purpose code is used for
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Purpose Code Guidelines
            </h4>
            <ul className="text-xs text-green-800 space-y-1 ml-6 list-disc">
              <li>Use clear, descriptive codes (e.g., "MARKETING" not "MKT")</li>
              <li>Keep codes consistent across your organization</li>
              <li>Purpose codes help users understand data usage</li>
              <li>Once created, codes can be used in consent requests</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              disabled={isAdding}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="flex-1 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Purpose Code
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurposeCodeModal;
