'use client';

import { useEffect, useContext } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import { ExaminationsContext } from "../lib/context/ExaminationsContext";
import Navbar from "./Navbar";
import style from '@/app/ui/admin/layout.module.css';
import ConfirmationPopUp from "../lib/components/ConfirmationPopUp/confirmationPopUp";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useContext(AuthContext);
  const { dashboardDeletionMode, setDashboardDeletionMode } = useContext(ExaminationsContext);

  useEffect(() => {
    console.log('Layout renderizado pela troca de usuario.');
  }, [user]);

  return (
    <div className="admin-layout">
    <Navbar />
    <div className={ style.admin_layout__content }>
      { children }
    </div>
    { dashboardDeletionMode && <ConfirmationPopUp /> }
  </div>
  )
}

export default AdminLayout;