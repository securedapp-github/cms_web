import { useState } from 'react';
import { Key, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiKeySuccessModalProps {
  apiKey: string;
  keyName: string;
  environment: 'live' | 'test';
  onClose: () => void;
}

const ApiKeySuccessModal = ({ apiKey, keyName, environment, onClose }: ApiKeySuccessModalProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success('API key copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Failed to copy API key');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full   animate-slideUp">
        {/* Header */}
        <div className={`${environment === 'live' ? 'bg-linear-to-r from-purple-600 to-pink-600' : 'bg-linear-to-r from-blue-600 to-indigo-600'} px-6 py-5`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">API Key Created Successfully!</h2>
              <p className="text-white/90 text-sm">{keyName}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-scroll max-h-[80vh]">
          {/* Critical Warning */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-900 mb-1">
                  ⚠️ SAVE THIS KEY NOW - YOU WON'T SEE IT AGAIN!
                </h4>
                <p className="text-xs text-red-800">
                  This is the only time you'll see the full API key. Copy it now and store it securely. 
                  Once you close this window, you won't be able to retrieve it.
                </p>
              </div>
            </div>
          </div>

          {/* Environment Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Environment:</span>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 ${
              environment === 'live' 
                ? 'bg-purple-100 text-purple-700 border-purple-300' 
                : 'bg-blue-100 text-blue-700 border-blue-300'
            }`}>
              {environment.toUpperCase()}
            </span>
          </div>

          {/* API Key Display */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your API Key
            </label>
            <div className="relative">
              <div className="bg-gray-900 rounded-lg p-4 border-2 border-gray-700">
                <code className="text-sm font-mono text-green-400 break-all select-all">
                  {apiKey}
                </code>
              </div>
              
              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className={`absolute top-3 right-3 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Security Best Practices */}
          {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Security Best Practices
            </h4>
            <ul className="text-xs text-blue-800 space-y-1.5 ml-6 list-disc">
              <li>Store this key in a secure password manager or secrets vault</li>
              <li>Never commit API keys to version control (Git, GitHub, etc.)</li>
              <li>Use environment variables to store keys in your applications</li>
              <li>Rotate keys regularly for enhanced security</li>
              <li>Revoke immediately if compromised</li>
            </ul>
          </div> */}

          {/* Key Details */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Information</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Key Name</p>
                <p className="font-medium text-gray-900">{keyName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Environment</p>
                <p className="font-medium text-gray-900">{environment}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="font-medium text-green-700">Active</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all shadow-md hover:shadow-lg ${
                copied
                  ? environment === 'live'
                    ? 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!copied}
              title={!copied ? 'Please copy the API key before closing' : 'Close this dialog'}
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  I've Saved My Key - Close
                </span>
              ) : (
                'Copy the key before closing'
              )}
            </button>
          </div>

          {!copied && (
            <p className="text-center text-xs text-gray-500">
              👆 You must copy the API key before you can close this window
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeySuccessModal;
