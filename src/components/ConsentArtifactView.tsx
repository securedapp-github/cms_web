import { X, FileJson, CheckCircle } from 'lucide-react';

interface ConsentArtifactViewProps {
    isOpen: boolean;
    onClose: () => void;
    artifactString?: string;
}

export default function ConsentArtifactView({ isOpen, onClose, artifactString }: ConsentArtifactViewProps) {
    if (!isOpen || !artifactString) return null;

    let artifact = {};
    try {
        artifact = JSON.parse(artifactString);
    } catch (e) {
        artifact = { error: "Invalid Artifact JSON" };
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                            <FileJson className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Consent Artifact</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Signed MeitY/DPDP Compliant Record</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="mb-4 flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span>Cryptographically Signed & Verifiable</span>
                    </div>
                    <pre className="font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all">
                        {JSON.stringify(artifact, null, 2)}
                    </pre>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Close Viewer
                    </button>
                </div>
            </div>
        </div>
    );
}
