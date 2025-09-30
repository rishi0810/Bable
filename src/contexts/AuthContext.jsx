import { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    userId: null,
    loading: true,
    error: null
  });

  const checkAuth = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(
        "https://bable-backend.vercel.app/user/authcheck",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error('Authentication check failed');
      }

      const data = await response.json();
      
      setAuthState({
        isAuthenticated: data.Authenticated || false,
        user: data.user || null,
        userId: data.userId || null,
        loading: false,
        error: null
      });

      return data.Authenticated;
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        userId: null,
        loading: false,
        error: error.message
      });
      return false;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch("https://bable-backend.vercel.app/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      await checkAuth();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return false;
    }
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch(
        "https://bable-backend.vercel.app/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      setAuthState({
        isAuthenticated: false,
        user: null,
        userId: null,
        loading: false,
        error: null
      });

      return response.ok;
    } catch (error) {
      console.error('Logout error:', error);

      setAuthState({
        isAuthenticated: false,
        user: null,
        userId: null,
        loading: false,
        error: error.message
      });
      return false;
    }
  }, []);

  const refreshAuth = useCallback(() => {
    return checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const contextValue = {
    ...authState,
    login,
    logout,
    refreshAuth,
    checkAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;