import { TOKEN_KEY, USER_KEY } from './constants';
import type { User } from '../types/auth.types';

export const storage = {
  // Token management
  setToken: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // User management
  setUser: (user: User): void => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  getUser: (): User | null => {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  removeUser: (): void => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  // Clear all auth data
  clearAuth: (): void => {
    storage.removeToken();
    storage.removeUser();
  },

  // Session storage alternatives for "Remember Me" feature
  session: {
    setToken: (token: string): void => {
      try {
        sessionStorage.setItem(TOKEN_KEY, token);
      } catch (error) {
        console.error('Error saving session token:', error);
      }
    },

    getToken: (): string | null => {
      try {
        return sessionStorage.getItem(TOKEN_KEY);
      } catch (error) {
        console.error('Error getting session token:', error);
        return null;
      }
    },

    removeToken: (): void => {
      try {
        sessionStorage.removeItem(TOKEN_KEY);
      } catch (error) {
        console.error('Error removing session token:', error);
      }
    },
  },
};
