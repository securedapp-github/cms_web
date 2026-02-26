import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { MockBackendProvider } from './context/MockBackendContext';
import { QuizProvider } from './context/QuizContext';
import DashboardLayout from './layouts/DashboardLayout';
import ConsentManager from './pages/dashboard/ConsentManager';
import GrievanceManager from './pages/dashboard/Grievances';
import IdentitySettings from './pages/dashboard/IdentitySettings';
import AdminOverview from './pages/admin/AdminOverview';
import AdminLogs from './pages/admin/AdminLogs';
import AdminGrievanceManagement from './pages/admin/AdminGrievances';
import AdminDemoRequests from './pages/admin/AdminDemoRequests';
import AdminSettings from './pages/admin/AdminSettings';
// Admin Quiz Config removed

import CookieBanner from './components/CookieBanner';
import CertificateManager from './pages/admin/CertificateManager';
import CertificateVerification from './pages/CertificateVerification';
import CertificateView from './pages/CertificateView';
import { CertificateProvider } from './context/CertificateContext';

function App() {
  return (
    <MockBackendProvider>
      <QuizProvider>
        <CertificateProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
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
                {/* Quiz Config Route Removed */}

                <Route path="certificates" element={<CertificateManager />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Public Verification Route */}
              <Route path="/verify/:id" element={<CertificateVerification />} />

              {/* User Certificate View (Protected) */}
              <Route path="/certificate/view/:token" element={<CertificateView />} />

            </Routes>
            <CookieBanner />
          </BrowserRouter>
        </CertificateProvider>
      </QuizProvider>
    </MockBackendProvider>
  );
}

export default App;

