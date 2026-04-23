const API_URL = import.meta.env.VITE_API_URL || \;
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(\, { email, password });
    if (data.success) {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    }
  };

  const register = async (name, email, password, role) => {
    const { data } = await axios.post(\, { name, email, password, role });
    if (data.success) {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
