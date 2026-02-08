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
  );
}

export default App;
