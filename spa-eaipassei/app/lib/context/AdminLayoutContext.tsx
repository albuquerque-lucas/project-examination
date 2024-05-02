'use client';

import { createContext, useState, useMemo } from "react";

export type AdminLayoutContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  pageChange: boolean;
  setPageChange: (pageChange: boolean) => void;
};

const defaultValue: AdminLayoutContextType = {
  sidebarOpen: false,
  setSidebarOpen: () => {},
  pageChange: false,
  setPageChange: () => {}
};

export const AdminLayoutContext = createContext<AdminLayoutContextType>(defaultValue);

interface AdminLayoutProviderProps {
  children: React.ReactNode;
}

export default function AdminLayoutProvider({ children }: AdminLayoutProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageChange, setPageChange] = useState(false);
  const value = useMemo(() => ({ 
    sidebarOpen,
    setSidebarOpen,
    pageChange,
    setPageChange,
  }), [
    sidebarOpen,
    pageChange,
  ]);

  return (
    <AdminLayoutContext.Provider value={value}>
      {children}
    </AdminLayoutContext.Provider>
  );
}