import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RoleBasedRedirectProps {
  children?: React.ReactNode;
}

const RoleBasedRedirect = ({ children }: RoleBasedRedirectProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role
  if (user.role === 'Admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role === 'Fiduciary') {
    return <Navigate to="/fiduciary/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRedirect;
