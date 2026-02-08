import { useState } from 'react';
import { useMockBackend } from '../../context/MockBackendContext';
import { CheckCircle, Clock } from 'lucide-react';

export default function AdminGrievanceManagement() {
    const { grievances, updateGrievanceStatus } = useMockBackend();
    const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');

    const filtered = grievances.filter(g => filter === 'all' || (filter === 'open' ? g.status !== 'resolved' : g.status === 'resolved'));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Grievance Resolution</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('open')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'open' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        Open
                    </button>
                    <button
                        onClick={() => setFilter('resolved')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'resolved' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        Resolved
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No grievances found matching the filter.</p>
                ) : (
                    filtered.map(grievance => (
                        <div key={grievance.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-mono text-xs text-gray-400">#{grievance.id}</span>
                                        <h3 className="font-bold text-gray-900">{grievance.subject}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{grievance.description}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${grievance.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
                                    grievance.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {grievance.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-t pt-4">
                                <div className="text-xs text-gray-500">
                                    User ID: <span className="font-mono">{grievance.userId}</span> • {new Date(grievance.createdAt).toLocaleDateString()}
                                </div>

                                {grievance.status !== 'resolved' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => updateGrievanceStatus(grievance.id, 'in_progress')}
                                            disabled={grievance.status === 'in_progress'}
                                            className="text-sm px-3 py-1.5 flex items-center space-x-1 text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Clock className="w-4 h-4" />
                                            <span>Mark In Progress</span>
                                        </button>
                                        <button
                                            onClick={() => updateGrievanceStatus(grievance.id, 'resolved', 'Resolved by Admin')}
                                            className="text-sm px-3 py-1.5 flex items-center space-x-1 text-green-600 hover:bg-green-50 rounded"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Resolve</span>
                                        </button>
                                    </div>
                                )}
                                {grievance.status === 'resolved' && (
                                    <span className="text-sm text-green-600 flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-1" /> Resolved
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
