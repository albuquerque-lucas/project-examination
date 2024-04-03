'use client';

import { SessionProvider } from "next-auth/react";
import AuthProvider from "../lib/context/AuthContext";
import AdminLayout from "./AdminLayout";
import ExaminationsProvider from "../lib/context/ExaminationsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ExaminationsProvider>
          <AdminLayout>
            { children }
          </AdminLayout>
        </ExaminationsProvider>
      </AuthProvider>
    </SessionProvider>
  );
}