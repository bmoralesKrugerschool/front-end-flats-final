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
      const res = await login(credentials);
      if (res.code !== 200 || !res.data) {
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
      console.error('Error signing in:', error);
      return error.response.data;
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
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;