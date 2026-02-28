import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User, LoginRequest } from '../types/auth.types';
import { storage } from '../utils/storage';
import authService from '../services/auth.service';
import toast from 'react-hot-toast';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest, rememberMe?: boolean) => Promise<User>;
  logout: () => void;
  setAuthUser: (user: User, token: string, rememberMe?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JWTPayload {
  id: number;
  email: string;
  role: string;
  exp: number;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  };

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = () => {
      const storedToken = storage.getToken() || storage.session.getToken();
      const storedUser = storage.getUser();

      if (storedToken && storedUser && !isTokenExpired(storedToken)) {
        setToken(storedToken);
        setUser(storedUser);
      } else {
        // Token expired or invalid, clear storage
        storage.clearAuth();
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const setAuthUser = (user: User, token: string, rememberMe = false) => {
    setUser(user);
    setToken(token);
    
    if (rememberMe) {
      storage.setToken(token);
      storage.setUser(user);
    } else {
      storage.session.setToken(token);
      storage.setUser(user); // Always store user in localStorage
    }
  };

  const login = async (data: LoginRequest, rememberMe = false): Promise<User> => {
    try {
      console.log('Login attempt with data:', data);
      const response = await authService.login(data);
      console.log('Login response:', response);
      
      if (response.success) {
        // Handle both response formats:
        // Format 1: { success, data: { user, token } }
        // Format 2: { success, user, token }
        const user = response.data?.user || (response as any).user;
        const token = response.data?.token || (response as any).token;
        
        if (user && token) {
          setAuthUser(user, token, rememberMe);
          toast.success(response.message || SUCCESS_MESSAGES.LOGIN_SUCCESS);
          return user;
        } else {
          throw new Error('Invalid response format');
        }
      } else {
        throw new Error(response.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || ERROR_MESSAGES.INVALID_CREDENTIALS;
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.clearAuth();
    storage.session.removeToken();
    toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    setAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
