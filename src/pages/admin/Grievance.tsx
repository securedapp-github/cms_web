import { Search, AlertCircle, CheckCircle2, Clock, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const Grievance = () => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const grievances = [
    {
      id: 'GRV-001',
      fiduciary: 'John Doe',
      issue: 'Consent approval delay',
      description: 'Unable to approve consent requests for multiple events',
      priority: 'high',
      status: 'open',
      createdAt: '2025-11-17T10:30:00',
      assignedTo: 'Support Team A',
    },
    {
      id: 'GRV-002',
      fiduciary: 'Jane Smith',
      issue: 'Data access request',
      description: 'Cannot access historical consent data',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2025-11-17T08:15:00',
      assignedTo: 'Support Team B',
    },
    {
      id: 'GRV-003',
      fiduciary: 'Mike Johnson',
      issue: 'Profile update issue',
      description: 'Profile changes not saving properly',
      priority: 'low',
      status: 'resolved',
      createdAt: '2025-11-16T14:20:00',
      assignedTo: 'Support Team A',
    },
    {
      id: 'GRV-004',
      fiduciary: 'Sarah Williams',
      issue: 'Event creation error',
      description: 'Getting error while creating new events',
      priority: 'medium',
      status: 'open',
      createdAt: '2025-11-16T11:45:00',
      assignedTo: 'Support Team C',
    },
  ];

  const filteredGrievances = grievances.filter((g) => 
    priorityFilter === 'all' ? true : g.priority === priorityFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'in-progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700';
      case 'medium':
        return 'bg-amber-50 text-amber-700';
      case 'low':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grievance Management</h1>
            <p className="mt-2 text-sm text-gray-600">
              Track and resolve fiduciary grievances efficiently.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium shadow-sm">
            Create Ticket
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {grievances.filter(g => g.status === 'open').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {grievances.filter(g => g.status === 'in-progress').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {grievances.filter(g => g.status === 'resolved').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ticket ID, fiduciary, or issue..."
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPriorityFilter('all')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                priorityFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriorityFilter('high')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                priorityFilter === 'high'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              High
            </button>
            <button
              onClick={() => setPriorityFilter('medium')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                priorityFilter === 'medium'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setPriorityFilter('low')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                priorityFilter === 'low'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Low
            </button>
          </div>
        </div>

        {/* Grievances List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredGrievances.map((grievance) => (
              <div key={grievance.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-purple-600 font-medium">
                        {grievance.id}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(grievance.priority)}`}>
                        {grievance.priority.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(grievance.status)}`}>
                        {grievance.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{grievance.issue}</h3>
                    <p className="text-sm text-gray-600 mb-2">{grievance.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Filed by: <span className="font-medium text-gray-700">{grievance.fiduciary}</span></span>
                      <span>•</span>
                      <span>Assigned to: <span className="font-medium text-gray-700">{grievance.assignedTo}</span></span>
                      <span>•</span>
                      <span>{formatDate(grievance.createdAt)}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
