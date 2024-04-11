import { createContext, useState, useMemo } from "react";
import { NavigationLink, NavigationContextType } from "../types/navigationTypes";

const defaultValue: NavigationContextType = {
  navigationLinks: [],
  setNavigationLinks: () => {},
  loaded: false,
  setLoaded: () => {},
};

export const NavigationContext = createContext<NavigationContextType>(defaultValue);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export default function NavigationProvider({ children }: NavigationProviderProps) {
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);
  const [loaded, setLoaded] = useState(false);

  const value = useMemo(() => {
    return {
      navigationLinks,
      setNavigationLinks,
      loaded,
      setLoaded,
    }
  }, [
    navigationLinks,
    loaded
  ]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}