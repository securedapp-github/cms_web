import { useState } from 'react';
import { useMockBackend } from '../../context/MockBackendContext';
import { Clock, Info, FileJson, CheckCircle, AlertTriangle, XCircle, History, RefreshCw } from 'lucide-react';
import ConsentArtifactView from '../../components/ConsentArtifactView';
import { ConsentRecord } from '../../types';

export default function ConsentManager() {
    const { consents, purposes, updateConsent } = useMockBackend();
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedArtifact, setSelectedArtifact] = useState<string>('');

    const handleViewArtifact = (artifact: any) => {
        if (artifact) {
            // Artifact might be stringified already or an object
            const artifactStr = typeof artifact === 'string' ? artifact : JSON.stringify(artifact);
            setSelectedArtifact(artifactStr);
            setViewerOpen(true);
        }
    };

    const getLifecycleStatus = (consent: ConsentRecord) => {
        const now = new Date();
        const validUntil = new Date(consent.validUntil);

        if (consent.status === 'withdrawn') return 'REVOKED';
        if (now > validUntil) return 'EXPIRED';
        if (consent.history && consent.history.length > 1) return 'MODIFIED'; // If history exists, it was modified
        return 'ACTIVE';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-700 border-green-200';
            case 'REVOKED': return 'bg-red-100 text-red-700 border-red-200';
            case 'EXPIRED': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'MODIFIED': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACTIVE': return <CheckCircle className="w-3 h-3 mr-1" />;
            case 'REVOKED': return <XCircle className="w-3 h-3 mr-1" />;
            case 'EXPIRED': return <AlertTriangle className="w-3 h-3 mr-1" />;
            case 'MODIFIED': return <RefreshCw className="w-3 h-3 mr-1" />;
            default: return <Info className="w-3 h-3 mr-1" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h1 className="text-3xl font-bold mb-3 text-gray-900">Consent Lifecycle Manager</h1>
                <p className="text-gray-600 leading-relaxed">
                    View active consents, track their complete lifecycle, and audit historical changes.
                    All actions are cryptographically signed and logged for compliance.
                </p>
            </div>

            <div className="grid gap-6">
                {purposes.map((purpose) => {
                    const consent = consents.find(c => c.purposeId === purpose.id);
                    if (!consent) return null; // Should usually exist due to init

                    const isGranted = consent.status === 'granted';
                    const lifecycleStatus = getLifecycleStatus(consent);

                    return (
                        <div key={purpose.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Header Section */}
                            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{purpose.name}</h3>
                                        {purpose.required && (
                                            <span className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border border-gray-200">
                                                Required
                                            </span>
                                        )}
                                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border flex items-center ${getStatusColor(lifecycleStatus)}`}>
                                            {getStatusIcon(lifecycleStatus)}
                                            {lifecycleStatus}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{purpose.description}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col items-end">
                                        <label className={`relative inline-flex items-center cursor-pointer ${purpose.required ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={isGranted}
                                                disabled={purpose.required}
                                                onChange={() => {
                                                    const newStatus = isGranted ? 'withdrawn' : 'granted';
                                                    if (newStatus === 'withdrawn') {
                                                        if (confirm(`Are you sure you want to revoke consent for ${purpose.name}? This will stop related services.`)) {
                                                            updateConsent(purpose.id, newStatus);
                                                        }
                                                    } else {
                                                        updateConsent(purpose.id, newStatus);
                                                    }
                                                }}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                        <span className="text-[10px] text-gray-400 mt-1 font-medium">{isGranted ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Artifact & Metadata Bar */}
                            <div className="px-6 py-3 bg-gray-50 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <span className="flex items-center" title="Valid Until">
                                        <Clock className="w-3 h-3 mr-1 text-gray-400" />
                                        Exp: {new Date(consent.validUntil).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center" title="Last Updated">
                                        <History className="w-3 h-3 mr-1 text-gray-400" />
                                        Updated: {new Date(consent.lastUpdated).toLocaleString()}
                                    </span>
                                </div>
                                {consent.artifact && (
                                    <button
                                        onClick={() => handleViewArtifact(consent.artifact)}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors"
                                    >
                                        <FileJson className="w-3.5 h-3.5 mr-1" />
                                        View Signed Artifact
                                    </button>
                                )}
                            </div>

                            {/* Timeline / History */}
                            <div className="p-6 bg-white">
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Audit Trail</h5>
                                <div className="relative border-l-2 border-slate-200 ml-2 space-y-6">
                                    {/* Show current state at top? No, chronological usually means newest top. Let's do newest top. */}
                                    {/* Actually history array stores old states. The current state is the record itself. 
                                        Let's merge them for display or just show history array reversed.
                                    */}
                                    {[{ status: consent.status, timestamp: consent.lastUpdated, actor: 'You (Current)' }, ...(consent.history ? [...consent.history].reverse() : [])].map((h, i) => (
                                        <div key={i} className="mb-4 ml-4">
                                            <div className={`absolute w-3 h-3 rounded-full -left-[7px] border-2 border-white ${h.status === 'granted' ? 'bg-green-500' :
                                                    h.status === 'withdrawn' ? 'bg-red-500' : 'bg-gray-400'
                                                }`}></div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-semibold capitalize ${h.status === 'granted' ? 'text-green-700' : 'text-red-700'
                                                        }`}>
                                                        {h.status === 'withdrawn' ? 'Revoked' : h.status}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(h.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                                    {h.actor || 'System'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ConsentArtifactView
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
                artifactString={selectedArtifact}
            />
        </div>
    );
}

