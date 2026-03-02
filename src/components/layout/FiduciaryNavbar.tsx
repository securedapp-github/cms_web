import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, Activity, HelpCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const FiduciaryNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/fiduciary/dashboard', icon: LayoutDashboard },
    { name: 'Events', href: '/fiduciary/events', icon: Activity },
    { name: 'Help Center', href: '/fiduciary/help-center', icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/fiduciary/dashboard" className="flex items-center group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                     style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)' }}>
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Consent Management
                </div>
                <div className="text-xs text-gray-500">Fiduciary Portal</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <div className="flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                      active
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Profile Avatar */}
            <Link 
              to="/fiduciary/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/fiduciary/profile')
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {getInitials(user?.name || 'U')}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            {/* Profile Link in Mobile */}
            <Link
              to="/fiduciary/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive('/fiduciary/profile')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(user?.name || 'U')}
              </div>
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default FiduciaryNavbar;
