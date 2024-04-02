'use client';

import { useEffect, useContext } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import Navbar from "./Navbar";
import style from '@/app/ui/admin/layout.module.css';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log('Layout renderizado pela troca de usuario.');
  }, [user]);

  return (
    <div className="admin-layout">
    <Navbar />
    <div className={ style.admin_layout__content }>
      { children }
    </div>
  </div>
  )
}

export default AdminLayout;