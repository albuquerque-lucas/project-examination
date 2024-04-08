'use client';

import { SessionProvider } from "next-auth/react";
import AuthProvider from "../lib/context/AuthContext";
import AdminLayout from "./AdminLayout";
import ExaminationsProvider from "../lib/context/ExaminationsContext";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ExaminationsProvider>
          <Suspense fallback={ <Loading /> }>
            <AdminLayout>
                { children }
            </AdminLayout>
          </Suspense>
        </ExaminationsProvider>
      </AuthProvider>
    </SessionProvider>
  );
}