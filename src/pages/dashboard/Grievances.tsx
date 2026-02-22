import { useState } from 'react';
import { useMockBackend } from '../../context/MockBackendContext';
import { Send, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function GrievanceManager() {
    const { grievances, submitGrievance } = useMockBackend();
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitGrievance(subject, description);
        setSubject('');
        setDescription('');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Submit Form */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                    File a Grievance
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Unable to withdraw consent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Please provide details about your issue..."
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
                        <Send className="w-4 h-4 mr-2" /> Submit Ticket
                    </button>
                </form>
            </div>

            {/* History List */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Your Recent Tickets</h2>
                {grievances.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No grievances filed yet.</p>
                ) : (
                    <div className="space-y-4">
                        {grievances.map(item => (
                            <div key={item.id} className="border rounded-lg p-4 hover:bg-slate-50 transition">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900">#{item.id} - {item.subject}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                        {item.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                <div className="flex items-center text-xs text-gray-400">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(item.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
