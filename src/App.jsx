import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Flats from './pages/FlatsPages';
import NotFoundPage from './pages/NotFoundPage';
import ThemeSwitcher from './components/ThemeSwitcher';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import SendCodePage from './pages/password/SendCodePage';
import ResetPasswordPage from './pages/password/ResetPasswordPage';

const AppContent = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'|| location.pathname === '/send-code' ||location.pathname === '/reset-password';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Flats/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/send-code" element={< SendCodePage/>} />
        <Route path="/reset-password" element={< ResetPasswordPage/>} />
        <Route path="/profile" element={<ProtectedRoute><h1>Profile</h1></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/flats" element={<ProtectedRoute><Flats /></ProtectedRoute>} />
        <Route path="/flats/:id" element={<h1>Flat Details</h1>} />
        <Route path="/flats/:id/edit" element={<h1>Edit Flat</h1>} />
        <Route path="/flats/new" element={<h1>New Flat</h1>} />
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
