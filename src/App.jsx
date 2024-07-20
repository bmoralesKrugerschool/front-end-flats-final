import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FlatsPage from './pages/FlatsPage';
import NotFoundPage from './pages/NotFoundPage';
import ThemeSwitcher from './components/ThemeSwitcher';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import SendCodePage from './pages/password/SendCodePage';
import ResetPasswordPage from './pages/password/ResetPasswordPage';
import NewFlatsPage from './pages/flats/newFlats/NewFlatsPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';

const AppContent = () => {
  const location = useLocation();

  const isAuthPage = ['/login', '/register', '/send-code', '/reset-password'].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<FlatsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/send-code" element={<SendCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/myflats" element={<ProtectedRoute><FlatsPage /></ProtectedRoute>} />
        <Route path="/flats/:id" element={<h1>Flat Details</h1>} />
        <Route path="/flats/:id/edit" element={<h1>Edit Flat</h1>} />
        <Route path="/flats/new" element={<ProtectedRoute><NewFlatsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeSwitcher>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeSwitcher>
  );
}

export default App;
