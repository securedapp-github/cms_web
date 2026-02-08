import { useMockBackend } from '../../context/MockBackendContext';
import { FileCheck, AlertTriangle, Activity, Mail } from 'lucide-react';

export default function AdminOverview() {
    const { grievances, consents, demoRequests } = useMockBackend();

    // Calculate stats
    const totalConsents = consents.length;
    const activeConsents = consents.filter(c => c.status === 'granted').length;
    const openGrievances = grievances.filter(g => g.status === 'open').length;
    const pendingDemoRequests = demoRequests?.length || 0;

    const stats = [
        { label: 'Total Consents', value: totalConsents, icon: FileCheck, color: 'bg-blue-500' },
        { label: 'Active Grants', value: activeConsents, icon: Activity, color: 'bg-green-500' },
        { label: 'Demo Requests', value: pendingDemoRequests, icon: Mail, color: 'bg-indigo-500' },
        { label: 'Open Grievances', value: openGrievances, icon: AlertTriangle, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Overview of system status and compliance metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition">
                        Export Compliance Report
                    </button>
                    <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
                        Manage Data Retention
                    </button>
                </div>
            </div>
        </div>
    );
}
