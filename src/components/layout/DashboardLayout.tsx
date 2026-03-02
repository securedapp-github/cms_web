import React from 'react';
import type { ReactNode } from 'react';
import { LogOut, User } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Top Navbar */}
      <nav className="glass-effect border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo size="md" />

            {/* User Info & Actions */}
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-2 bg-primary-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary-900 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-primary-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.role}</p>
                </div>
                <span className="hidden md:inline-block px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                  {user?.status}
                </span>
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
