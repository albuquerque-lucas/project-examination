'use client';

import { createContext, useState, useMemo } from "react";

export type AdminLayoutContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
};

const defaultValue: AdminLayoutContextType = {
  sidebarOpen: false,
  setSidebarOpen: () => {},
};

export const AdminLayoutContext = createContext<AdminLayoutContextType>(defaultValue);

interface AdminLayoutProviderProps {
  children: React.ReactNode;
}

export default function AdminLayoutProvider({ children }: AdminLayoutProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const value = useMemo(() => ({ 
    sidebarOpen,
    setSidebarOpen
  }), [
    sidebarOpen
  ]);

  return (
    <AdminLayoutContext.Provider value={value}>
      {children}
    </AdminLayoutContext.Provider>
  );
}