import type { User, UserRole, UserStatus } from './auth.types';

export type { User, UserRole, UserStatus };

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
