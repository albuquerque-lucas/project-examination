'use client';

import Navbar from "./Navbar";
import style from '@/app/ui/admin/layout.module.css';

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className={ style.admin_layout__content }>
        { children }
      </div>
    </div>
  );
}