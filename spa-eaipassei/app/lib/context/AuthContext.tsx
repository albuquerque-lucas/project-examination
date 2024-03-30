'use client';

import { createContext, useState, useMemo, ReactNode } from 'react';

type User = {
  id: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  username: string | null;
  account_plan: string | null;
  phone_number: string | null;
  subscription_date: string | null;
  subscription_duration_days: number | null;
  subscription_fee: number | string | null;
  subscription_missing_days: number | null;
  created_at: string | null;
  updated_at: string | null;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  authenticated: false,
  setAuthenticated: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
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
    };
  }, [
    user,
    authenticated,
    setAuthenticated,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};