'use client';

import { useEffect } from "react";
import Navbar from "./Navbar";
import style from '@/app/ui/admin/layout.module.css';
import { SessionProvider, useSession } from "next-auth/react";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="admin-layout">
        <Navbar />
        <div className={ style.admin_layout__content }>
          { children }
        </div>
      </div>
    </ SessionProvider>
      
  );
}