import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kiểm tra token khi tải lại trang
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        // Token còn hợp lệ
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(decodedToken);
      } else {
        // Token hết hạn
        logout();
      }
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(decodedToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
