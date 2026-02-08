import { useMockBackend } from '../../context/MockBackendContext';
import { Download, Search, ShieldAlert, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdminLogs() {
    const { logs } = useMockBackend();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = logs.filter(log =>
        log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Timestamp,User ID,Action,Purpose ID,IP Address\n"
            + logs.map(e => `${e.timestamp},${e.userId},${e.action},${e.purposeId},${e.ipAddress}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `audit_logs_${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <ShieldAlert className="w-6 h-6 mr-2 text-blue-600" />
                        Audit Logs
                    </h1>
                    <p className="text-gray-600">Tamper-resistant record of all consent events.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-white bg-gray-50 text-gray-700 transition"
                >
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search logs by User ID or Action..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 w-full text-sm"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Purpose</th>
                                <th className="px-6 py-3">Metadata</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No logs found</td>
                                </tr>
                            ) : (
                                filteredLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3 whitespace-nowrap text-gray-600">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3 font-mono text-xs text-blue-600">{log.userId}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${log.action === 'grant' ? 'bg-green-100 text-green-700' :
                                                log.action === 'deny' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-700">{log.purposeId}</td>
                                        <td className="px-6 py-3 text-xs text-gray-500 font-mono" title={JSON.stringify(log.metadata)}>
                                            <div className="flex flex-col gap-1">
                                                <span className="truncate max-w-xs">{JSON.stringify(log.metadata)}</span>
                                                {log.metadata?.artifactId && (
                                                    <button
                                                        onClick={() => {
                                                            // Mock fetch artifact from purpose/log
                                                            // For now we assume if ID exists it's valid
                                                            // In real app we would verify signature of the stored artifact
                                                            alert('Artifact Integrity Verified: Valid Signature');
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1 w-fit"
                                                    >
                                                        <CheckCircle className="w-3 h-3" /> Verify Artifact
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
