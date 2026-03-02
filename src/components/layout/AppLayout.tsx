import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FiduciaryNavbar from './FiduciaryNavbar';
import AdminNavbar from './AdminNavbar';
import UserNavbar from './UserNavbar';

const AppLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render role-specific navbar
  const renderNavbar = () => {
    if (user.role === 'Fiduciary') {
      return <FiduciaryNavbar />;
    } else if (user.role === 'Admin') {
      return <AdminNavbar />;
    } else if (user.role === 'User') {
      return <UserNavbar />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavbar()}
      <main className="transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
