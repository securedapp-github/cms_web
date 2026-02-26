import { useState, useEffect } from 'react';
import { useMockBackend } from '../../context/MockBackendContext';
import { FileCheck, AlertTriangle, Activity, Mail, Search, Trash2, Edit2, RotateCcw } from 'lucide-react';
import { AdminUserRecord } from '../../components/Quiz/types';
import Modal from '../../components/Modal';

export default function AdminOverview() {
    const { grievances, consents, demoRequests } = useMockBackend();
    const [quizAttempts, setQuizAttempts] = useState<AdminUserRecord[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

    // Edit Form State
    const [editForm, setEditForm] = useState<Partial<AdminUserRecord>>({});

    useEffect(() => {
        const loadAttempts = () => {
            try {
                const stored = localStorage.getItem('quiz_admin_session');
                if (stored) {
                    setQuizAttempts(JSON.parse(stored));
                }
            } catch (e) {
                console.error('Failed to load quiz attempts', e);
            }
        };

        loadAttempts();

        // Listen for storage changes to update in real-time
        window.addEventListener('storage', loadAttempts);
        return () => window.removeEventListener('storage', loadAttempts);
    }, []);

    const saveAttempts = (updatedAttempts: AdminUserRecord[]) => {
        localStorage.setItem('quiz_admin_session', JSON.stringify(updatedAttempts));
        setQuizAttempts(updatedAttempts);
        window.dispatchEvent(new Event('storage'));
    };

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all quiz attempt data? This cannot be undone.')) {
            localStorage.removeItem('quiz_admin_session');
            setQuizAttempts([]);
            window.dispatchEvent(new Event('storage'));
        }
    };

    // --- Edit Handlers ---
    const openEditModal = (user: AdminUserRecord) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            university: user.university || '',
            maxAttempts: user.maxAttempts ?? 2
        });
        setIsEditModalOpen(true);
    };

    const handleEditSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        const updatedAttempts = quizAttempts.map(user => {
            if (user.email === selectedUser.email) {
                return {
                    ...user,
                    name: editForm.name || user.name,
                    email: editForm.email || user.email,
                    phone: editForm.phone || user.phone,
                    university: editForm.university || user.university,
                    maxAttempts: Number(editForm.maxAttempts)
                };
            }
            return user;
        });

        saveAttempts(updatedAttempts);
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    // --- Delete Handlers ---
    const openDeleteModal = (user: AdminUserRecord) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;
        const updatedAttempts = quizAttempts.filter(user => user.email !== selectedUser.email);
        saveAttempts(updatedAttempts);
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleResetAttempts = () => {
        if (!selectedUser) return;
        const updatedAttempts = quizAttempts.map(user => {
            if (user.email === selectedUser.email) {
                return { ...user, attempts: 0 };
            }
            return user;
        });
        saveAttempts(updatedAttempts);
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    // --- Render ---

    const filteredAttempts = quizAttempts.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            {/* Quiz Attempts Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-900">Level-Up Quiz Attempts</h2>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                Live
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Real-time monitoring of user assessments</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {quizAttempts.length > 0 && (
                            <button
                                onClick={handleClearData}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Clear All Data"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Attempt</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAttempts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        {searchTerm ? (
                                            <div className="flex flex-col items-center">
                                                <Search className="w-8 h-8 text-gray-300 mb-2" />
                                                <p>No results found for "{searchTerm}"</p>
                                            </div>
                                        ) : (
                                            <p>No quiz attempts recorded in this session.</p>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                filteredAttempts.map((user, index) => {
                                    const maxAttempts = user.maxAttempts ?? 2;
                                    const attempts = user.attempts;
                                    const isLimitReached = attempts >= maxAttempts;

                                    return (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                                <div className="text-sm text-gray-500">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isLimitReached ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                    {attempts} / {maxAttempts}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.lastAttemptAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(user)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit User Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit User Details"
            >
                <form onSubmit={handleEditSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={editForm.email || ''}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={editForm.phone || ''}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University / Company</label>
                        <input
                            type="text"
                            value={editForm.university || ''}
                            onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Optional"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Quiz Attempts</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={editForm.maxAttempts || 2}
                                onChange={(e) => setEditForm({ ...editForm, maxAttempts: parseInt(e.target.value) })}
                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                                required
                            />
                            <span className="text-sm text-gray-500">
                                (Used: {quizAttempts.find(u => u.email === editForm.email)?.attempts || 0})
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Increase this value to give the user more chances.</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete User Record"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete the quiz record for <span className="font-semibold text-gray-900">{selectedUser?.name}</span>?
                    </p>

                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                        <div className="text-sm text-orange-800">
                            <p className="font-semibold">Action Required</p>
                            <p>You can either completely remove this user or just reset their quiz attempts.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <button
                            onClick={handleResetAttempts}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset Attempts Only</span>
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Record</span>
                        </button>
                    </div>

                    <div className="flex justify-center pt-2">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
