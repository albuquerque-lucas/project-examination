'use client';

import { createContext, useState, useMemo } from "react";
import { NavigationLink, NavigationContextType } from "../types/navigationTypes";

const defaultValue: NavigationContextType = {
  navigationLinks: [],
  setNavigationLinks: () => {},
};

export const NavigationContext = createContext<NavigationContextType>(defaultValue);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export default function NavigationProvider({ children }: NavigationProviderProps) {
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);

  const value = useMemo(() => {
    return {
      navigationLinks,
      setNavigationLinks,
    }
  }, [
    navigationLinks,
  ]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}