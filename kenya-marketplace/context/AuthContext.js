import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const bootstrapAsync = async () => {
      try {
        const userString = await SecureStore.getItemAsync('user');
        if (userString) {
          setUser(JSON.parse(userString));
        }
      } catch (e) {
        console.log('Failed to load user from storage', e);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    // In a real app, you would validate with an API
    // This is a mock implementation
    if (email && password) {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+254712345678',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      };
      
      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = async (name, email, phone, password) => {
    // In a real app, you would register with an API
    // This is a mock implementation
    if (name && email && phone && password) {
      const mockUser = {
        id: '1',
        name,
        email,
        phone,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      };
      
      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
