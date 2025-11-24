import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Landing from '../../pages/Landing';

const HomeRoute = () => {
  const { user } = useAuth();

  // If user is logged in, redirect to their dashboard
  if (user) {
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'Fiduciary') {
      return <Navigate to="/fiduciary/dashboard" replace />;
    }
  }

  // If not logged in, show landing page
  return <Landing />;
};

export default HomeRoute;
