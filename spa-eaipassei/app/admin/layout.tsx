'use client';

import AuthProvider from "../lib/context/AuthContext";
import AdminLayout from "./AdminLayout";
import ExaminationsProvider from "../lib/context/ExaminationsContext";
import NavigationProvider from "../lib/context/NavigationContext";
import NoticesProvider from "../lib/context/NoticesContext";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <NavigationProvider>
        <AuthProvider>
          <ExaminationsProvider>
            <NoticesProvider>
              <Suspense fallback={ <Loading /> }>
                <AdminLayout>
                    { children }
                </AdminLayout>
              </Suspense>
            </NoticesProvider>
          </ExaminationsProvider>
        </AuthProvider>
      </NavigationProvider>
  );
}