import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Flats from './pages/FlatsPages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><h1>Profile</h1></ProtectedRoute>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/flats" element={<ProtectedRoute><Flats /></ProtectedRoute>} />
          <Route path="/flats/:id" element={<h1>Flat Details</h1>} />
          <Route path="/flats/:id/edit" element={<h1>Edit Flat</h1>} />
          <Route path="/flats/new" element={<h1>New Flat</h1>} />
          <Route path="*" element={<h1>NotFound</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
