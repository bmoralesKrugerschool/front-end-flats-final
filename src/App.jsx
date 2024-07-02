import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <h1>Profile</h1>
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<h1>About</h1>} /> 
          <Route path="/flats" element={<h1>Flats</h1>} /> 
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
