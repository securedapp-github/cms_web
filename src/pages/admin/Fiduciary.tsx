import { Search, UserCheck, UserX, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const Fiduciary = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const fiduciaries = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+91 9876543210',
      events: 45,
      consents: 234,
      status: 'active',
      joinedDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      mobile: '+91 9876543211',
      events: 38,
      consents: 198,
      status: 'active',
      joinedDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      mobile: '+91 9876543212',
      events: 32,
      consents: 156,
      status: 'inactive',
      joinedDate: '2024-03-10',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      mobile: '+91 9876543213',
      events: 28,
      consents: 142,
      status: 'active',
      joinedDate: '2024-04-05',
    },
  ];

  const filteredFiduciaries = fiduciaries.filter((f) => 
    statusFilter === 'all' ? true : f.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fiduciary Management</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and monitor all fiduciaries in the system.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium shadow-sm">
            Add Fiduciary
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                statusFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                statusFilter === 'active'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Active
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                statusFilter === 'inactive'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <UserX className="w-4 h-4" />
              Inactive
            </button>
          </div>
        </div>

        {/* Fiduciaries Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiduciary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Events
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFiduciaries.map((fiduciary) => (
                  <tr key={fiduciary.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-600">
                            {fiduciary.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{fiduciary.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{fiduciary.email}</div>
                      <div className="text-xs text-gray-500">{fiduciary.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fiduciary.events}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fiduciary.consents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          fiduciary.status === 'active'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-50 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {fiduciary.status.charAt(0).toUpperCase() + fiduciary.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(fiduciary.joinedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fiduciary;
