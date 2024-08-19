// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { register, login } from '../servers/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/v1/user/profile');
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const signUp = async (userData) => {
    try {
      const res = await register(userData);
      if (res.code !== 201 || !res.data) {
        return res;
      }
      const userWithAvatar = {
        ...res.data,
        avatar: getInitialsAvatar(res.data.user.firstName)
      };
      setUser(userWithAvatar);
      localStorage.setItem('user', JSON.stringify(userWithAvatar));
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setIsAuthenticated(true);
      return res;
    } catch (error) {
      console.error('Error signing up:', error);
      return error.response.data;
    }
  };

  const signIn = async (credentials) => {
    try {
      // Realiza la solicitud de inicio de sesión
      const response = await login(credentials);
  
      // Verifica la respuesta del servidor
      if (response.code !== 200 || !response.data) {
        return response; // Devuelve la respuesta en caso de error
      }
  
      // Obtén la información del usuario y el token de la respuesta
      const { token, user } = response.data;
  
      // Crea un objeto con la información del usuario, incluyendo el avatar
      const userWithAvatar = {
        ...user,
        avatar: getInitialsAvatar(user.firstName)
      };
  
      // Actualiza el estado del usuario
      setUser(userWithAvatar);
  
      // Almacena el usuario y el token en localStorage
      localStorage.setItem('user', JSON.stringify(userWithAvatar));
      localStorage.setItem('token', token);
  
      // Configura el encabezado de autorización en Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Actualiza el estado de autenticación
      setIsAuthenticated(true);
  
      // Devuelve la respuesta en caso de éxito
      return response;
    } catch (error) {
      // Maneja los errores
      console.error('Error signing in:', error);
      
      // Devuelve el error en caso de fallo
      return error.response ? error.response.data : { message: 'An unknown error occurred' };
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const getInitialsAvatar = (firstName) => {
    const initials = firstName.split(' ').map(n => n[0]).join('');
    return `${initials[0]}`;
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      logout,
      user,
      signUp,
      signIn,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
