'use client';

import { SessionProvider } from "next-auth/react";
import AuthProvider from "../lib/context/AuthContext";
import AdminLayout from "./AdminLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AdminLayout>
          { children }
        </AdminLayout>
      </AuthProvider>
    </SessionProvider>
  );
}