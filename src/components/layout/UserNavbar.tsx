import { LayoutDashboard, Bell, HelpCircle, User2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const UserNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { name: 'Notifications', path: '/user/notifications', icon: Bell },
    { name: 'Help Center', path: '/user/help-center', icon: HelpCircle },
    { name: 'Profile', path: '/user/profile', icon: User2 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/user/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">CMS</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
