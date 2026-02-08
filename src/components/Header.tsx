import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMockBackend } from '../context/MockBackendContext';

export default function Header() {
  const { user } = useMockBackend();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <img
            src="/STRIGHT.png"
            alt="Secure CMS"
            className="h-24 w-auto transition-transform duration-300 hover:scale-105"
          />

          <div className="flex items-center space-x-6">
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
