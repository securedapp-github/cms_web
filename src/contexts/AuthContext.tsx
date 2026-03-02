// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/auth.service';
import { SessionManager, auditLog, rateLimiter } from '@/utils/security';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  role: 'fiduciary' | 'admin';
  name: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: string, remember: boolean) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sessionManager = new SessionManager();

  // Check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Auto logout on session timeout
  const handleSessionTimeout = useCallback(() => {
    toast.error('Session expired due to inactivity');
    auditLog.log('SESSION_TIMEOUT', { user: user?.email });
    logout();
  }, [user]);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

        if (storedToken && !isTokenExpired(storedToken)) {
          const decoded: any = jwtDecode(storedToken);
          setToken(storedToken);
          setUser({
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
            verified: decoded.verified,
          });

          // Start session monitoring
          sessionManager.startMonitoring(handleSessionTimeout);

          auditLog.log('SESSION_RESTORED', { email: decoded.email });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      sessionManager.stopMonitoring();
    };
  }, [handleSessionTimeout]);

  // Login function
  const login = async (email: string, password: string, role: string, remember: boolean) => {
    // Rate limiting
    if (!rateLimiter.check(`login_${email}`)) {
      throw new Error('Too many login attempts. Please try again in 15 minutes.');
    }

    try {
      const response = await authService.login({ email, password, role });
      const { token: newToken, user: userData } = response.data;

      // Store token
      if (remember) {
        localStorage.setItem('auth_token', newToken);
      } else {
        sessionStorage.setItem('auth_token', newToken);
      }

      setToken(newToken);
      setUser(userData);

      // Reset rate limiter on successful login
      rateLimiter.reset(`login_${email}`);

      // Start session monitoring
      sessionManager.startMonitoring(handleSessionTimeout);

      auditLog.log('LOGIN_SUCCESS', { email, role });
      toast.success(`Welcome back, ${userData.name}!`);
    } catch (error: any) {
      auditLog.log('LOGIN_FAILED', { email, error: error.message });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    sessionManager.stopMonitoring();

    auditLog.log('LOGOUT', { email: user?.email });
    toast.success('Logged out successfully');
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      await authService.register(data);
      auditLog.log('REGISTRATION', { email: data.email, role: data.role });
      toast.success('Registration successful! Please verify your email.');
    } catch (error: any) {
      auditLog.log('REGISTRATION_FAILED', { email: data.email, error: error.message });
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    register,
    isAuthenticated: !!token && !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};