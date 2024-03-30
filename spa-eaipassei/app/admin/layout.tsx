'use client';

import { useEffect } from "react";
import Navbar from "./Navbar";
import style from '@/app/ui/admin/layout.module.css';
import { SessionProvider, useSession } from "next-auth/react";
import AuthProvider from "../lib/context/AuthContext";

export default function Layout({children}: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
    <SessionProvider>
      <AuthProvider>
        <div className="admin-layout">
          <Navbar />
          <div className={ style.admin_layout__content }>
            { children }
          </div>
        </div>
      </AuthProvider>
    </ SessionProvider>
      
  );
}