<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import { MockBackendProvider } from './context/MockBackendContext';
import DashboardLayout from './layouts/DashboardLayout';
import ConsentManager from './pages/dashboard/ConsentManager';
import GrievanceManager from './pages/dashboard/Grievances';
import IdentitySettings from './pages/dashboard/IdentitySettings';
import AdminOverview from './pages/admin/AdminOverview';
import AdminLogs from './pages/admin/AdminLogs';
import AdminGrievanceManagement from './pages/admin/AdminGrievances';
import AdminDemoRequests from './pages/admin/AdminDemoRequests';
import AdminSettings from './pages/admin/AdminSettings';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <MockBackendProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/consents" replace />} />
            <Route path="consents" element={<ConsentManager />} />
            <Route path="grievances" element={<GrievanceManager />} />
            <Route path="identity" element={<IdentitySettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="grievances" element={<AdminGrievanceManagement />} />
            <Route path="demo-requests" element={<AdminDemoRequests />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </MockBackendProvider>
=======
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
import FiduciaryHelpCenter from './pages/fiduciary/HelpCenter';

// User Pages
import UserDashboard from './pages/user/Dashboard.tsx';
import UserHelpCenter from './pages/user/HelpCenter';
import UserNotifications from './pages/user/Notifications';
import FiduciaryDetailsPage from './pages/user/FiduciaryDetails';

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

          <Route path="/fiduciary" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<FiduciaryDashboard />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="help-center" element={<FiduciaryHelpCenter />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="/fiduciary/dashboard" replace />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="fiduciary/:id" element={<FiduciaryDetailsPage />} />
            <Route path="help-center" element={<UserHelpCenter />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="/user/dashboard" replace />} />
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
>>>>>>> bf94a3986d9147857f84bc14b7c3f64dbc5a48fa
  );
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> bf94a3986d9147857f84bc14b7c3f64dbc5a48fa
