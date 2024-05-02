'use client';

import AdminLayout from "./AdminLayout";
import { useEffect, useContext } from "react";
import { AdminLayoutContext } from "../lib/context/AdminLayoutContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setSidebarOpen, pageChange, setPageChange } = useContext(AdminLayoutContext);
  useEffect(() => {
    if (pageChange) {
      setSidebarOpen(false);
      setPageChange(false);
    }
  }, [pageChange]);
  return (
    <AdminLayout>
        { children }
    </AdminLayout>
  );
}