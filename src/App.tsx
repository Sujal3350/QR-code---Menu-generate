import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import MenuEditorPage from './pages/menu/MenuEditorPage';
import ThemeSelectPage from './pages/themes/ThemeSelectPage';
import QRCodePage from './pages/qrcode/QRCodePage';
import PublicMenuPage from './pages/public/PublicMenuPage';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-burgundy-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AuthProvider>
        <MenuProvider>
          <div className="min-h-screen bg-gray-50 font-sans">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/menu/:id" element={<PublicMenuPage />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menu-editor"
                element={
                  <ProtectedRoute>
                    <MenuEditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/theme-select"
                element={
                  <ProtectedRoute>
                    <ThemeSelectPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr-code"
                element={
                  <ProtectedRoute>
                    <QRCodePage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect from root to login or dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </MenuProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;