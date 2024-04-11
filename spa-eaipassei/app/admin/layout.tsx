'use client';

import { SessionProvider } from "next-auth/react";
import AuthProvider from "../lib/context/AuthContext";
import AdminLayout from "./AdminLayout";
import ExaminationsProvider from "../lib/context/ExaminationsContext";
import NavigationProvider from "../lib/context/NavigationContext";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavigationProvider>
        <AuthProvider>
          <ExaminationsProvider>
            <Suspense fallback={ <Loading /> }>
              <AdminLayout>
                  { children }
              </AdminLayout>
            </Suspense>
          </ExaminationsProvider>
        </AuthProvider>
      </NavigationProvider>
    </SessionProvider>
  );
}