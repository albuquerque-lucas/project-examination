'use client';

import { useEffect, useContext } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import { ExaminationsContext } from "../lib/context/ExaminationsContext";
import Navbar from "./Navbar";
import ConfirmationPopUp from "../lib/components/ConfirmationPopUp/confirmationPopUp";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '@/app/ui/admin/layout.module.css';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useContext(AuthContext);
  const { dashboardDeletionMode, setDashboardDeletionMode } = useContext(ExaminationsContext);

  useEffect(() => {
    // console.log('Layout renderizado pela troca de usuario.');
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="admin-layout"
      >
    <Navbar />
    <div className={ style.admin_layout__content }>
      { children }
    </div>
    <AnimatePresence>
      { dashboardDeletionMode &&
          <ConfirmationPopUp />
      }
    </AnimatePresence>
  </motion.div>
  )
}

export default AdminLayout;