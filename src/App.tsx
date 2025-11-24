import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { QueryProvider } from './providers/QueryProvider';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleBasedRedirect from './components/common/RoleBasedRedirect';
import HomeRoute from './components/common/HomeRoute';
import AppLayout from './components/layout/AppLayout';

// Auth Pages
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyResetToken from './pages/VerifyResetToken';
import ResetPassword from './pages/ResetPassword';

// Fiduciary Pages
import FiduciaryDashboard from './pages/fiduciary/Dashboard';
import EventsPage from './pages/fiduciary/EventsPage';
import HelpCenter from './pages/fiduciary/HelpCenter';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Fiduciary from './pages/admin/Fiduciary';
import Grievance from './pages/admin/Grievance';
import FiduciariesPage from './pages/admin/Fiduciaries';
import GrievancesPage from './pages/admin/Grievances';

// Shared Pages
import Profile from './pages/shared/ProfileEnhanced';

function App() {
  return (
    <Router>
      <QueryProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#0F172A',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeRoute />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-token" element={<VerifyResetToken />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Fiduciary Routes */}
          <Route path="/fiduciary" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<FiduciaryDashboard />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="/fiduciary/dashboard" replace />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="fiduciary" element={<Fiduciary />} />
            <Route path="fiduciaries" element={<FiduciariesPage />} />
            <Route path="grievance" element={<Grievance />} />
            <Route path="grievances" element={<GrievancesPage />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Redirect old dashboard route based on role */}
          <Route path="/dashboard" element={<ProtectedRoute><RoleBasedRedirect /></ProtectedRoute>} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;

