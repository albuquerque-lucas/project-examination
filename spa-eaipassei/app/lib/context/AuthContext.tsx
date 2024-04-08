'use client';

import { createContext, useState, useMemo, ReactNode } from 'react';
import { User } from '../types/userTypes';
import { AuthMessage } from '../types/messageTypes';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  authMessage: AuthMessage | null;
  setAuthMessage: (authMessage: AuthMessage | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {},
  authMessage: null,
  setAuthMessage: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null);
  const [user, _setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null;
  });

  const value = useMemo(() => {
    const setUser = (user: User | null) => {
      if (typeof window !== 'undefined') {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      }
      _setUser(user);
    };
    return {
      user,
      setUser,
      authenticated,
      setAuthenticated,
      authMessage,
      setAuthMessage,
    };
  }, [
    user,
    authenticated,
    setAuthenticated,
    authMessage,
    setAuthMessage,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};