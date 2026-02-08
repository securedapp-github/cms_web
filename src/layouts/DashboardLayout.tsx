import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useMockBackend } from '../context/MockBackendContext';
import {
    LayoutDashboard,
    Shield,
    FileText,
    AlertCircle,
    LogOut,
    Bell,
    Menu,
    X,
    User,
    MessageSquare,
    Lock
} from 'lucide-react';

export default function DashboardLayout() {
    const { user, logout, notifications, markNotificationRead } = useMockBackend();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const navItems = [
        { label: 'Consent Manager', path: '/dashboard/consents', icon: Shield, roles: ['user', 'fiduciary', 'admin'] },
        { label: 'Grievances', path: '/dashboard/grievances', icon: AlertCircle, roles: ['user', 'fiduciary', 'admin'] },
        { label: 'Identity & Access', path: '/dashboard/identity', icon: User, roles: ['user'] },
        { label: 'Ticket Management', path: '/admin/grievances', icon: MessageSquare, roles: ['admin'] },
        { label: 'Demo Requests', path: '/admin/demo-requests', icon: MessageSquare, roles: ['admin'] },
        { label: 'Audit Logs', path: '/admin/logs', icon: FileText, roles: ['admin', 'fiduciary'] },
        { label: 'Admin Panel', path: '/admin', icon: LayoutDashboard, roles: ['admin'] },
        { label: 'Settings', path: '/admin/settings', icon: Lock, roles: ['admin'] },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;
    const isAdminSection = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 ${isAdminSection ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 border-b ${isAdminSection ? 'border-slate-800' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-bold block leading-none">Secure<span className="text-orange-500">CMS</span></span>
                            {isAdminSection && <span className="text-xs text-gray-400 font-mono mt-1 block">ADMIN CONSOLE</span>}
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.filter(item => item.roles.includes(user?.role || '')).map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : isAdminSection
                                    ? 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                    : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white shadow-sm sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>

                        <div className="flex items-center space-x-6 ml-auto">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 text-gray-600 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <Bell className="w-6 h-6" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                                        <div className="px-4 py-2 border-b flex justify-between items-center">
                                            <h3 className="font-semibold">Notifications</h3>
                                            <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                                            ) : (
                                                notifications.map(n => (
                                                    <div
                                                        key={n.id}
                                                        className={`p-4 border-b hover:bg-slate-50 cursor-pointer ${n.read ? 'opacity-60' : ''}`}
                                                        onClick={() => markNotificationRead(n.id)}
                                                    >
                                                        <h4 className="text-sm font-semibold mb-1">{n.title}</h4>
                                                        <p className="text-sm text-gray-600">{n.message}</p>
                                                        <span className="text-xs text-gray-400 mt-2 block">{new Date(n.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center space-x-3 pl-6 border-l">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
