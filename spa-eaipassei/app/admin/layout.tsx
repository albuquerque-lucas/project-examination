'use client';

import AuthProvider from "../lib/context/AuthContext";
import AdminLayout from "./AdminLayout";
import ExaminationsProvider from "../lib/context/ExaminationsContext";
import NavigationProvider from "../lib/context/NavigationContext";
import NoticesProvider from "../lib/context/NoticesContext";
import SubjectsProvider from "../lib/context/SubjectsContext";
import { Suspense } from "react";
import Loading from "./loading";
import StudyAreasProvider from "../lib/context/StudyAreasContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <NavigationProvider>
        <AuthProvider>
          <StudyAreasProvider>
            <SubjectsProvider>
              <ExaminationsProvider>
                <NoticesProvider>
                  <Suspense fallback={ <Loading /> }>
                    <AdminLayout>
                        { children }
                    </AdminLayout>
                  </Suspense>
                </NoticesProvider>
              </ExaminationsProvider>
            </SubjectsProvider>
          </StudyAreasProvider>
        </AuthProvider>
      </NavigationProvider>
  );
}