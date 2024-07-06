import React, { createContext, useState, useEffect, useContext } from 'react';
import { register, login } from '../servers/auth';

export const AuthContext = createContext();

/**
 *  Hook to get the authentication context
 * @returns 
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


/**
 *  AuthProvider component to manage the authentication state of the user and provide the necessary functions to the children components.
 * @param {*} param0 
 * @returns 
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); //usuario logueado o null

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  /**
   *  Function to register a new user in the application
   * @param {*} userData 
   */
  const signUp = async (userData) => {
    console.log('userData:', userData);
    const res = await register(userData); //res.data
    console.log('res:', res); //res.data
    if (res.code !== 201 || !res.data) {
      return res;
    }
    const userWithAvatar = {
      ...res.data,
      avatar: getInitialsAvatar(res.data.user.name)
    };
    console.log('userWithAvatar:', userWithAvatar);
    
    setUser(userWithAvatar);
    localStorage.setItem('user', JSON.stringify(userWithAvatar));
    localStorage.setItem('token', res.data.token);
    setIsAuthenticated(true);
    return res;
  };

  const signIn = async (credentials) => {
    console.log('credentials  :', credentials );
    const res = await login(credentials);
    console.log('res:', res);

    if (res.code !== 200 || !res.data) { 
      return res;
    }

    const userWithAvatar = {
      ...res.data,
      avatar: getInitialsAvatar(res.data.user.name)
    };
    console.log('userWithAvatar:', userWithAvatar);
    
    setUser(userWithAvatar);
    localStorage.setItem('user', JSON.stringify(userWithAvatar));
    localStorage.setItem('token', res.data.token);
    setIsAuthenticated(true);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const getInitialsAvatar = (name) => {
    console.log('name:', name);
    const initials = name.split(' ').map(n => n[0]).join('');
    console.log('initials:', initials);
    return `${initials[0]}`;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, user, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
